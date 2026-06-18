// import React ,{ useState } from "react";
// import { StyleSheet,View, Text, Button } from "react-native";
// import Animated, {useAnimatedStyle, useSharedValue, withRepeat, withTiming} from "react-native-reanimated";

// export default function App(){
//   const scale=useSharedValue(1)

//   const [count, setCount]=useState(0)

//   const animatedStyle=useAnimatedStyle(() => {
//     return {
//       transform: [{scale: scale.value}]
//     }
//   })
//   const startPulse=() =>{
//     scale.value=withRepeat(
//       withTiming(1.5, {duration:500}),
//       -1,
//       true,
//     )
//   }

//   const blockJSThread = () => {
//     console.log("Blocking JS Thread...");
//     const start=Date.now()


//     while(Date.now() - start < 3000) {}

//     console.log("JS Thread unblocked!");
//     setCount(c => c+1)
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Thread Jammer Demo</Text>

//       <Animated.View style={[styles.box,animatedStyle]}>
//         <Text style={styles.counterText}>JS state count: {count}</Text>
//       </Animated.View>

//       <Button title="Start Pulse" onPress={startPulse}/>

//       <Button title="Block JS Thread (3 Sec)" onPress={blockJSThread} color="red" />
//     </View>
//   )
// }

// const styles=StyleSheet.create({
//   container:{
//     flex:1,
//     justifyContent:'center',
//     alignItems:'center',
//   },
//   title:{
//     fontSize: 24, color: '#FFF', marginBottom: 40
//   },
//   box:{ width: 100, height: 100, backgroundColor: '#00F0FF', borderRadius: 20, marginBottom: 40

//   },
//   counterText:{
//     fontSize: 20, color: '#FFF',marginBottom: 10
//   },
  
// })


import { View,Text,StyleSheet,Button,PanResponder } from "react-native";
import Animated,{useAnimatedStyle,useSharedValue, withSpring, withTiming} from "react-native-reanimated";

export default function App(){

  const width=useSharedValue(100)

  const handlePress=() => {
    width.value=withSpring((Math.random()*100)+50)
  }
  return (
      <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
        <Animated.View style={{
          width,height:100,
         backgroundColor: 'violet',
         borderRadius:20
        }}>
        
      </Animated.View>

      <Button title="Start" onPress={handlePress}></Button>
      </View>
  )
}