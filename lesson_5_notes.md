# 📝 Lesson 5 Study Notes: Scroll-Driven Animations & useAnimatedScrollHandler

In mobile interfaces, scroll-driven animations (like parallax headers, sticky titles, or fade-out search bars) make an app feel premium. However, scroll events are extremely high-frequency—they fire dozens of times per second.

If you handle scrolling on the React JS thread, the delay in passing scroll events across the bridge causes your header animations to lag behind your finger. Reanimated solves this by running scroll event handlers directly on the UI/native thread using **`useAnimatedScrollHandler`**.

---

## ⚙️ 1. useAnimatedScrollHandler

`useAnimatedScrollHandler` compiles your scroll callbacks into a UI-thread worklet. You attach it to an `<Animated.ScrollView>` or `<Animated.FlatList>` to capture scroll offsets in real-time without blocking the JS thread.

### Code Syntax:
```typescript
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

const scrollY = useSharedValue(0);

const scrollHandler = useAnimatedScrollHandler({
  onScroll: (event) => {
    // Read the vertical scroll offset in real-time on the UI thread
    scrollY.value = event.contentOffset.y;
  },
});

// Pass the handler to the ScrollView
<Animated.ScrollView 
  onScroll={scrollHandler} 
  scrollEventThrottle={16} // Tells React Native to emit scroll events every 16ms (60fps)
>
  {/* Content */}
</Animated.ScrollView>
```

---

## 🏔️ 2. The Parallax Zoom Header Effect

A classic scroll interaction is a **Parallax Zoom Header**. It has two distinct phases based on the scroll offset `y`:

### Phase A: Scrolling Down (Pulling Down / Overscroll)
* When you pull down beyond the top of the scroll list (`y < 0`), the header image should **scale up (zoom in)** to fill the empty space, making it feel elastic.
* **Math**: `scale = 1 + |y| / HEADER_HEIGHT`

### Phase B: Scrolling Up (Scrolling normal content)
* When you scroll up (`y > 0`), the header image should slide up slower than the scroll rate. This difference in speed creates the **parallax depth effect**.
* **Math**: `translateY = y / 2` (it moves at half-speed)
* The image can also fade out as it scrolls off-screen.

---

## 🧪 Lesson 5 Exercise: Parallax Zoom Header

To master scroll animations, you will build an interactive details page featuring a hero header image:
1. **Pulling down** scales the image up (overscroll zoom).
2. **Scrolling up** applies a parallax translate effect (image shifts upwards at a slower rate) and fades out the image.
3. **Title sticky effect**: The header title transitions from a large subtitle to a centered header bar at the top of the screen.

Let's create the boilerplate at `src/demos/ParallaxScrollDemo.tsx`.
