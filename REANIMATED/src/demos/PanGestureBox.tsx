import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export default function PanGestureBox(){

    const translateX=useSharedValue(0)
    const translateY=useSharedValue(0)

    const startX=useSharedValue(0)
    const startY=useSharedValue(0)

    const panGesture=Gesture.Pan()
    .onStart(() => {
        startX.value=translateX.value
        startY.value=translateY.value
    })
    .onUpdate((event) => {
        translateX.value= startX.value + event.translationX
        translateY.value=startY.value + event.translationY

    })
    .onEnd(() => {
        translateX.value=withSpring(0)
        translateY.value=withSpring(0)
    })
    
    const animatedStyle=useAnimatedStyle(() => ({
        transform: [
            {translateX: translateX.value},
            {translateY:translateY.value}
        ]
    }))
    
    return (
       <GestureHandlerRootView style={styles.container}>
        <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.box, animatedStyle]} />
        </GestureDetector>
       </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c1e',
  },
  box: {
    width: 120,
    height: 120,
    backgroundColor: '#30d158', // Playful green
    borderRadius: 24,
  },
});