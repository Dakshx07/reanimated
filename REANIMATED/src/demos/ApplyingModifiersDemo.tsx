import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming, 
  withRepeat, 
  withSequence, 
  withDelay 
} from "react-native-reanimated";

export default function ApplyingModifiersDemo(){
    const scale=useSharedValue(0)
    const translateX=useSharedValue(0)

    const handleShake=() => {
        translateX.value=withRepeat(
            withSequence(
                withTiming(-15, {duration:80}),
                withTiming(15,{duration:80}),
                withTiming(0, {duration:80})
            ),
            3, 
            false
        )
    }

    const handlePulse=() => {
        scale.value=withDelay(
            500,
            withRepeat(
                withTiming(1.3, {duration: 300}),
                4,
                true,
            )
        )
    }

    const animatedStyle=useAnimatedStyle(() => ({
        transform: [
            {translateX: translateX.value},
            {scale: scale.value}
        ]
    }))


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Modifiers Sandbox</Text>

            <Animated.View style={[styles.box, animatedStyle]} />
            <Button title="Trigger Shake" onPress={handleShake} color="#ff9500" />
            <View style={{ height: 12 }} />
            <Button title="Trigger Delayed Pulse" onPress={handlePulse} color="#34c759" />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c1c1e",
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 50,
  },
  box: {
    width: 120,
    height: 120,
    backgroundColor: "#007aff", // iOS Blue
    borderRadius: 24,
    marginBottom: 50,
  },
  buttonContainer: {
    width: "80%",
  },
});