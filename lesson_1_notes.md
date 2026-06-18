# 📝 Lesson 1 Study Notes: React Native Reanimated & Worklets Core Architecture

This document compiles the theoretical foundations of React Native Reanimated and Worklets. 

---

## 👨‍🍳 1. What is a Thread? (The Chef Analogy)
An application is like a **restaurant kitchen** (a Process).
* **A Thread is a Chef** executing instructions.

| Thread Model | Analogy | Application Behavior |
| :--- | :--- | :--- |
| **Single-Threaded** (Standard JS) | **One Chef** in the kitchen. If they are chopping onions (heavy CPU task), they cannot serve customers water (handle clicks). | Heavy JS tasks freeze the UI, causing frame drops and unresponsive controls. |
| **Multi-Threaded** (Reanimated/Worklets) | **Two Chefs** (JS Thread Chef & UI Thread Chef). Chef 1 handles payments and orders; Chef 2 stands at the counter sliding plates smoothly to customers. | Even if the JS Thread is locked or frozen, animations run smoothly at 60fps/120fps on the UI Thread. |

---

## ⚙️ 2. What is a Runtime?
JavaScript is a human-readable language. A **Runtime** (or JS Engine) is a program that compiles and executes JavaScript code into machine-readable binary.
* React Native typically uses the **Hermes** engine (or V8) to execute JS.
* In Reanimated, the app spawns **multiple isolated JS Runtimes**:
  1. **React JS Runtime**: Runs on the JS Thread, executing React state, hooks, and business logic.
  2. **UI Worklet Runtime**: Runs on the UI Thread, executing style mutations and animations inside the platform's render loop (Vsync).

> [!NOTE]
> **The Vsync Render Loop**: Modern screens refresh at 60Hz (once every 16.6ms) or 120Hz (once every 8.33ms). If your main JavaScript thread is busy parsing a large JSON payload and takes 40ms, it skips multiple frames. By running a dedicated UI Worklet Runtime on the UI thread, we can execute animation updates inside the platform's render loop (Vsync). The C++ native layer polls the UI Worklet Runtime for styling values on every single frame, ensuring frame-perfect 60fps/120fps transitions even if the JS thread is 100% frozen.

---

## 🛠️ 3. The Role of C++
Android is built on Java/Kotlin, and iOS is built on Objective-C/Swift. JavaScript cannot talk to native code directly.
* **C++ is the universal middleman** because both iOS and Android can execute C++ code natively.
* The React Native Worklets and Reanimated core engines are written in C++.
* C++ handles spawning threads, instantiating the Hermes engines, managing memory buffers, and communicating directly with platform layout engines.

---

## 🔍 4. What is a Host Object & JSI?
A **Host Object** is a C++ object exposed to the JavaScript runtime via JSI (JavaScript Interface).

### How do the JS VM and UI VM communicate?
* **The Legacy Bridge**: In older React Native versions, threads communicated by converting objects to JSON strings, putting them on an asynchronous message queue, and parsing them on the other side. This was asynchronous, serialized, and extremely slow.
* **JSI (JavaScript Interface)**: JSI is a lightweight C++ API that allows JavaScript code in a runtime to talk directly to C++ code. Through JSI, JS can register C++ objects as Host Objects.
* **Shared Values as Host Objects**: A Shared Value is actually a C++ Host Object. Both the JS Thread VM and the UI Thread VM hold direct pointer references to the *same* C++ structure.
* **To JavaScript**: It looks like a standard JS object (properties like `.value` can be read/written).
* **Under the Hood**: Every interaction triggers synchronous C++ setters/getters. There is no serialization or bridge bottleneck. Both the JS Thread VM and the UI Thread VM hold pointers to the same C++ Host Object, allowing instant cross-thread memory sharing.

---

## ⚡ 5. `useSharedValue` vs. `useState`

| Feature | `useState` (React State) | `useSharedValue` (Shared Value) |
| :--- | :--- | :--- |
| **Manager** | React Core Framework | Reanimated C++ Engine |
| **Location** | JS Thread Runtime | C++ Shared Memory (Host Object) |
| **Update Flow** | Triggers component re-render -> Re-evaluates JSX -> Virtual DOM diffing -> Sends diff to native. | Updates C++ buffer -> Notifies UI Thread VM -> Mutates styles on Native View immediately. |
| **Re-render Component?**| **Yes** | **No** (Bypasses React rendering pipeline entirely) |
| **Use Case** | UI structure (modals, texts, visibility switches, inputs). | Animation offsets, coordinates, scales, colors, opacity. |

---

## ❓ Lesson 1 Q&A

### Q1: Why can't the UI Thread JS VM directly access a normal JavaScript variable (like `const name = "Daksh";`) created in a React component?
> **Answer**: Because the JS Thread and the UI Thread run completely separate, isolated JavaScript engines (runtimes). They do not share a memory heap or garbage collector. A variable on the JS thread must be copied or wrapped in a shareable C++ object to be accessed on the UI thread.

### Q2: What is the difference between a traditional React state change (`useState`) and a Shared Value update (`useSharedValue`)?
> **Answer**: `useState` triggers a React component re-render, forcing the JS thread to rebuild the JSX tree and perform Virtual DOM reconciliation. `useSharedValue` updates the value directly in C++ memory, letting the UI thread mutate the native view styles instantly without triggering a component re-render or touching the JS thread.

### Q3: What is JSI (JavaScript Interface), and why does it make Reanimated faster than old React Native animations?
> **Answer**: JSI is a C++ interface that allows JavaScript to call C++ code directly and synchronously. It allows JS to interact with C++ Host Objects. This is faster because legacy React Native animations had to serialize objects to JSON strings, place them on an asynchronous message queue, and parse them on the native side. JSI bypasses this bridge completely.
