# 📝 Lesson 4 Study Notes: Layout Animations (Entering, Exiting & Layout Transitions)

In React Native, animating a component when it mounts (enters the screen) or unmounts (gets removed from the screen) is traditionally very complex. You usually have to keep the component in the state, run a timing animation, and then remove it from the JSX tree *after* the animation finishes.

Reanimated solves this natively with **Layout Animations**. You simply attach predefined or custom animations to the component, and Reanimated handles the mounting and unmounting transitions under the hood.

---

## 🚀 1. Entering Animations (`entering`)

When a component is mounted (added to the JSX tree), the `entering` modifier is triggered.

### Predefined Animations:
Reanimated provides a wide variety of out-of-the-box entering animations:
* **Fading**: `FadeIn`, `FadeInUp`, `FadeInDown`, `FadeInLeft`, `FadeInRight`
* **Sliding**: `SlideInUp`, `SlideInDown`, `SlideInLeft`, `SlideInRight`
* **Zooming**: `ZoomIn`, `ZoomInUp`, `ZoomInDown`
* **Bouncing**: `BounceIn`, `BounceInUp`, `BounceInDown`

### Code Syntax:
```tsx
import Animated, { FadeInUp } from 'react-native-reanimated';

function MyComponent() {
  return (
    <Animated.View entering={FadeInUp.duration(500).delay(200)}>
      <Text>Hello World!</Text>
    </Animated.View>
  );
}
```

---

## 🚪 2. Exiting Animations (`exiting`)

When a component is unmounted (removed from the JSX tree), the `exiting` modifier is triggered. The component is kept alive in the UI tree just long enough to complete the exit animation, then it is automatically removed.

### Predefined Animations:
* **Fading**: `FadeOut`, `FadeOutUp`, `FadeOutDown`
* **Sliding**: `SlideOutUp`, `SlideOutDown`, `SlideOutLeft`
* **Zooming**: `ZoomOut`, `ZoomOutUp`

### Code Syntax:
```tsx
import Animated, { FadeOutDown } from 'react-native-reanimated';

{isVisible && (
  <Animated.View exiting={FadeOutDown.duration(400)}>
    <Text>Goodbye World!</Text>
  </Animated.View>
)}
```

---

## 🔀 3. Layout Transitions (`layout`)

When a component is added, removed, or resized, the other elements on the screen shift positions to fill or make room. This shift is normally abrupt. 

By adding the `layout` prop to list items or containers, Reanimated will automatically animate the rest of the list elements to their new positions smoothly.

### Predefined Transitions:
* `LinearTransition` (moves elements linearly to their new layout coordinates)
* `SequencedTransition` (moves coordinates sequentially)
* `JumpingTransition` (adds a slight vertical jump when shifting)

### Code Syntax:
```tsx
import Animated, { LinearTransition } from 'react-native-reanimated';

// Each item in the list will animate smoothly when siblings are added/removed!
<Animated.View layout={LinearTransition.springify()}>
  <Text>{item.title}</Text>
</Animated.View>
```

---

## 🧪 Lesson 4 Exercise: Dynamic Todo List

To put layout animations into practice, you'll build an interactive **Todo List** where items:
1. **Slide and fade in** when added.
2. **Fade and scale out** when deleted.
3. **Smoothly slide into position** when surrounding items are removed.

Let's configure a new demo file for this: `src/demos/LayoutAnimationDemo.tsx`.
