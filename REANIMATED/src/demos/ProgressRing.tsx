import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const AnimatedCircle=Animated.createAnimatedComponent(Circle)
const AnimatedTextInput=Animated.createAnimatedComponent(TextInput)

const SIZE=200
const STROKE_WIDTH=20
const RADIUS=(SIZE-STROKE_WIDTH) / 2
const CIRCUMFERENCE=2*Math.PI* RADIUS

export default function ProgressRing(){
    const progress=useSharedValue(0)

    const pan=Gesture.Pan()
    .onChange((event) =>{
        const delta=event.changeX/200;
        const nextProgress=progress.value + delta


        progress.value=Math.min(Math.max(nextProgress,0),1)
    })

    const strokeOffset=useDerivedValue(() => {
        return CIRCUMFERENCE - ( CIRCUMFERENCE * progress.value)
    })

    const animatedCircleProps=useAnimatedProps(() => {
        return {
            strokeDashoffset:strokeOffset.value
        }
    })

    const animatedTextProps=useAnimatedProps(() => {
        return {
            text: `${Math.round(progress.value * 100)}%`,

        } as any
    })
    return (
    <GestureHandlerRootView style={styles.container}>
        <Text style={styles.title}>Interactive Progress Ring</Text>
      <Text style={styles.subtitle}>Drag left/right anywhere to fill</Text>

      <GestureDetector gesture={pan}>
          <View style={styles.ringContainer}>
            <Svg width={SIZE} height={SIZE}>
              <Circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              stroke="#2c2c2e"
              strokeWidth={STROKE_WIDTH}
              fill="transparent"
               />

               <AnimatedCircle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              stroke="#30d158"
              strokeWidth={STROKE_WIDTH}
              fill="transparent"
              strokeDasharray={CIRCUMFERENCE}
              strokeLinecap="round"
              // Rotate by -90 deg so the progress ring starts drawing at the top center
              transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
              animatedProps={animatedCircleProps}
            />
            </Svg>
            
            <View style={styles.textContainer} pointerEvents="none">
            <AnimatedTextInput
              underlineColorAndroid="transparent"
              editable={false}
              value="0%"
              style={styles.percentageText}
              animatedProps={animatedTextProps}
            />
          </View>
          </View>
      </GestureDetector>
    </GestureHandlerRootView>

    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f10',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8e8e93',
    marginBottom: 40,
  },
  ringContainer: {
    width: SIZE,
    height: SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
});