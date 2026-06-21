import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring,clamp, withTiming } from 'react-native-reanimated';

export default function TapCircle(){
    const pressed=useSharedValue<boolean>(false)
    const offset=useSharedValue<number>(0)

    const panGesture=Gesture.Pan()
    .onStart(() =>{
        pressed.value=true
    })
    .onUpdate((event) => {
        offset.value=event.translationX
    })
    .onEnd(()=>{
        pressed.value=false
        offset.value=0
    })

    const animatedStyles=useAnimatedStyle(() => ({
        backgroundColor:pressed.value ? "white" : "red",
        transform:[
            {translateX: withSpring(offset.value)},{scale:withSpring(pressed.value ? 1.2 : 1)}
        ]
    }))
    return (
        <GestureHandlerRootView style={styles.container}>
            <GestureDetector gesture={panGesture}>
                <Animated.View style={[styles.box,animatedStyles]}>

                </Animated.View>
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
 box:{
    width: 100,
    height: 100,
    borderRadius: 50,
 }
});