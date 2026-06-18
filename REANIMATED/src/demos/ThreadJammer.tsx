import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

export default function ThreadJammer() {
  const scale = useSharedValue(1);
  const [count, setCount] = useState(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    };
  });

  const startPulse = () => {
    scale.value = withRepeat(
      withTiming(1.5, { duration: 500 }),
      -1,
      true,
    );
  };

  const blockJSThread = () => {
    console.log("Blocking JS Thread...");
    const start = Date.now();

    while (Date.now() - start < 3000) {}

    console.log("JS Thread unblocked!");
    setCount(c => c + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thread Jammer Demo</Text>

      <Animated.View style={[styles.box, animatedStyle]}>
        <Text style={styles.counterText}>JS count: {count}</Text>
      </Animated.View>

      <View style={styles.buttonGap}>
        <Button title="Start Pulse" onPress={startPulse} />
        <View style={{ height: 12 }} />
        <Button title="Block JS Thread (3 Sec)" onPress={blockJSThread} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c1e',
  },
  title: {
    fontSize: 24,
    color: '#FFF',
    marginBottom: 40,
    fontWeight: 'bold',
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'violet',
    borderRadius: 20,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 16,
    color: '#FFF',
  },
  buttonGap: {
    width: '80%',
  }
});
