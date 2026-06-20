import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming, 
  withSpring, 
  Easing 
} from "react-native-reanimated";


export default function App() {
    const timingX=useSharedValue(0)
    const springX=useSharedValue(0)

    const handleTimingPress=() =>{
        timingX.value= timingX.value === 0 
        ? withTiming(150, {duration: 1000, easing:Easing.bounce})
        : withTiming(0,{ duration:1000, easing:Easing.bounce})
    }

    const handleSpringPress=() => {
        springX.value = springX.value === 0
        ? withSpring(150, {damping:5, stiffness: 120})
        : withSpring(0, {damping: 5, stiffness:120})
    }

    const timingStyle=useAnimatedStyle(() => ({
        transform: [{translateX: timingX.value}]
    }))

    const springStyle=useAnimatedStyle(() => ({
        transform: [{translateX: springX.value}]
    }))
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Customized withTiming (Bounce Easing)</Text>
            <Animated.View style={[styles.box, styles.timingBox, timingStyle]}></Animated.View>
            <Button title="Animate Timing" onPress={handleTimingPress} />

            <View style={styles.divider} />

            <Text style={styles.label}>Customized withSpring (Damping and Stiffness)</Text>
            <Animated.View style={[styles.box, styles.springBox, springStyle]}></Animated.View>
            <Button title="Animate Spring" onPress={handleSpringPress} />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 40,
    backgroundColor: "#1c1c1e",
  },
  box: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginVertical: 15,
  },
  timingBox: {
    backgroundColor: "#ff2d55",
  },
  springBox: {
    backgroundColor: "#5856d6",
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
  },
  divider: {
    height: 40,
  },
});