import React from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDecay,
} from 'react-native-reanimated';
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from 'react-native-gesture-handler';

const SZIE = 120
const BOUNDARY_OFFSET = 20

export default function Flick() {
    const offset = useSharedValue(0)
    const width = useSharedValue(0)

    const pan = Gesture.Pan()
        .onChange((event) => {
            offset.value += event.changeX
        })
        .onFinalize((event) => {
            offset.value = withDecay({
                velocity: event.velocityX,
                rubberBandEffect: true,
                clamp: [
                    -(width.value / 2) + SZIE / 2 + BOUNDARY_OFFSET,
                    (width.value / 2) - SZIE / 2 - BOUNDARY_OFFSET
                ]
            })
        })

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: offset.value }]
    }))
    return (
        <GestureHandlerRootView style={styles.container}>
            <GestureDetector gesture={pan}>
                <Animated.View style={[styles.box, animatedStyles]} />
            </GestureDetector>
        </GestureHandlerRootView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    wrapper: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        height: SZIE,
        width: SZIE,
        backgroundColor: '#b58df1',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});