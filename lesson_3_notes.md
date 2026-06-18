# 📝 Lesson 3 Study Notes: Thread Communication & Scheduling

This document details how isolated threads and runtimes communicate asynchronously using Message Passing in React Native Worklets and Reanimated.

---

## 🏝️ The Two Islands Analogy
React Native executes code on two primary separate environments (islands) separated by water:
1. **React Island (The JS Thread)**: Runs your React hooks, JSX rendering, state (`useState`), and business logic.
2. **Native Island (The UI Thread)**: Renders native views, measures layouts, and runs smooth animations at 60fps/120fps.

Because these threads run separate JS engines with isolated memory heaps, they cannot share pointer references. To communicate, they must use an **Asynchronous Mailbox system**.

---

## 📬 1. Sending Mail: JS to UI (`runOnUI`)

### When to use:
When you are running code on the JS Thread (e.g., inside a button's `onPress` callback) and want to trigger an animation or update a value on the UI Thread.

### Code Syntax:
```typescript
import { runOnUI } from 'react-native-reanimated';

const myUIWorklet = (newValue: number) => {
  'worklet';
  position.value = newValue; // Executed on the UI Thread
};

// Called from the JS Thread:
runOnUI(myUIWorklet)(350);
```

---

## 📬 2. Sending Mail: UI to JS (`runOnJS`)

### When to use:
When you are running code inside a worklet on the UI Thread (e.g., inside a gesture handler tracking a drag) and need to call a JS thread action—like updating a React state, navigating to a new screen, or calling a fetch request.

### Code Syntax:
```typescript
import { runOnJS } from 'react-native-reanimated';

const handleStateChange = (completed: boolean) => {
  setIsFinished(completed); // React state update (JS Thread only!)
};

const gestureFinishedWorklet = () => {
  'worklet';
  // Triggered on the UI Thread, schedules execution on the JS Thread
  runOnJS(handleStateChange)(true); 
};
```

> [!WARNING]
> **Double Parentheses Syntax**: In `runOnJS(functionName)(args)`, the first call `runOnJS(fn)` packages and addresses the message envelope. The second call `(args)` sends the envelope to the JS thread queue. Omitting the second set of parentheses will fail to send the message.

---

## ⏱️ 3. Why Thread Communication is Asynchronous

* **Asynchronous**: The sender drops the task into the receiver's queue and immediately resumes work.
* **Synchronous**: The sender blocks (freezes) and waits for the receiver to finish executing and reply.

### The Animation Vsync Constraint:
The UI Thread must draw a frame every **16.6ms (60Hz)** or **8.33ms (120Hz)**. 
* If the UI thread called the JS thread synchronously, it would block and freeze until the JS thread finished.
* If the JS thread is busy doing a heavy calculation (taking 50ms), the UI thread would skip frames, causing visible stutter (jank).
* **Therefore, `runOnJS` is strictly asynchronous.** The UI thread fires the event and immediately goes back to drawing pixels.

---

## ⚙️ 4. Low-Level Scheduling (Custom Runtimes)

The underlying `react-native-worklets` library generalizes this thread-scheduling system:

```typescript
import { createWorkletRuntime, runOnRuntimeAsync, scheduleOnUI, scheduleOnRN } from 'react-native-worklets';

// 1. Create a third, dedicated background thread (e.g. Database Island)
const dbRuntime = createWorkletRuntime('DatabaseThread');

// 2. Schedule a worklet on the UI thread
scheduleOnUI(() => {
  'worklet';
  console.log("Running on UI Thread!");
})();

// 3. Schedule a worklet on the JS thread
scheduleOnRN(() => {
  console.log("Running on React JS Thread!");
})();

// 4. Run asynchronously on your custom background thread
runOnRuntimeAsync(dbRuntime, () => {
  'worklet';
  // Perform heavy database indexing here...
})();
```

---

## ❓ Lesson 3 Q&A

### Q1: What happens if you try to call React's `setScore(10)` directly inside a style worklet (Native Island) without using `runOnJS`?
> **Answer**: It will cause a runtime crash or error. Since the UI VM and the JS VM are isolated, the UI Thread VM does not have access to the React state setters, context, or Virtual DOM. Running `setState` on the UI thread directly will fail because the environment doesn't understand or hold the React state engine.

### Q2: Why is it critical that `runOnJS` is asynchronous? What would happen to your animations if Native Island had to freeze and wait for React Island to finish updating state?
> **Answer**: If it were synchronous, the UI Thread (Native Island) would block and freeze at the dock, waiting for the JS Thread (React Island) to complete execution. If the JS thread is busy or performing a heavy calculation, the UI thread would miss its frame duration target (16.6ms for 60Hz or 8.33ms for 120Hz), resulting in skipped frames and visible animation stutter (jank).

### Q3: If you have a heavy sorting task that takes 200ms, how can you spawn a third island (background thread) in the Worklets library so it doesn't block the React Island or the Native Island?
> **Answer**: You can call `createWorkletRuntime('ThreadName')` to spawn a dedicated C++ thread with its own Hermes/V8 JS engine instance. Then, you use `runOnRuntimeAsync(customRuntime, workletFunction)()` to execute the heavy task asynchronously on that background thread, leaving the main React thread and the UI rendering thread completely free to remain responsive.
