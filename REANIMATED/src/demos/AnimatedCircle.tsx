import React from "react";
import { StyleSheet, View, Button } from "react-native";
import Animated, { useAnimatedProps, useSharedValue, withTiming } from "react-native-reanimated";
import { Circle, Svg } from 'react-native-svg';

const AnimatedCircleComponent = Animated.createAnimatedComponent(Circle);

export default function AnimatedCircle() {
  const r = useSharedValue(20);

  const handlePress = () => {
    r.value += 20;
  };

  const animatedProps = useAnimatedProps(() => ({
    r: withTiming(r.value)
  }));

  return (
    <View style={styles.container}>
      <Svg style={styles.svg}>
        <AnimatedCircleComponent
          cx='50%' 
          cy='50%' 
          fill="#b58df1" 
          animatedProps={animatedProps}
        />
      </Svg>
      <Button onPress={handlePress} title="Grow Circle" />
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
  svg: {
    width: 200,
    height: 200,
    marginBottom: 40,
  }
});
