import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring,clamp } from 'react-native-reanimated';

export default function SlideToUnlock(){
    const translateX=useSharedValue(0)

    const startX=useSharedValue(0)

    const panGesture=Gesture.Pan()
    .onStart(() => {
        startX.value=translateX.value
    })
    .onUpdate((event) => {
        const nextX=startX.value + event.translationX
        translateX.value=clamp(nextX,0,170)
    })
    .onEnd(() => {
        if(translateX.value > 110){
            translateX.value=withSpring(170)
        }else{
            translateX.value=withSpring(0)
        }
    })

    const animatedStyle=useAnimatedStyle(() => ({
        transform: [
            {translateX: translateX.value}
        ]
    }))
    return (
        <GestureHandlerRootView style={styles.container}>
            <GestureDetector gesture={panGesture}>
                <Animated.View style={styles.slider}>
                    <Animated.View style={[styles.knob,animatedStyle]}></Animated.View>
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
  slider:{
    width:250,
    height:80,
    borderRadius:45,
    backgroundColor:"#30d158",
  },
  knob:{
    width:60,
    height:60,
    borderRadius:30,
    backgroundColor:"#fff",
    position:"absolute",
    top:10,
    left:10,
  }
});