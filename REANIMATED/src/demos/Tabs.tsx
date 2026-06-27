import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const TAB_WIDTH=150
const TABS=['Home','Search','Profile']
export default function Tabs(){
    const offset=useSharedValue<number>(-TAB_WIDTH)

    const animatedStyle=useAnimatedStyle(() => ({
        transform:[{translateX:offset.value}]
    }))

    const handlePress=(tab : string)=>{
        const newOffset=(() => {
            switch(tab) {
                case 'Home':
                    return -TAB_WIDTH
                case 'Search':
                    return 0
                case 'Profile':
                    return TAB_WIDTH
                default: 
                    return -TAB_WIDTH
            }
        })();
        
        offset.value=withTiming(newOffset,{duration:500})
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.tabs}>
                
                {TABS.map((tab,i) => (
                    <Pressable 
                        key={i}
                        style={ i !== TABS.length-1 ? [styles.tab, styles.divider] : styles.tab}
                        onPress={() => handlePress(tab)}
                     >
                        <Text style={[styles.tabLabel]}>{tab}</Text>
                     </Pressable>
                    
                ))}
            </View>
            <Animated.View style={[styles.animatedBorder, animatedStyle]} />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  tabs: {
    flexDirection: 'row',
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: TAB_WIDTH,
  },
  tabLabel: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  divider: {
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  animatedBorder: {
    height: 8,
    width: 64,
    backgroundColor: 'var(--swm-purple-dark-100)',
    borderRadius: 20,
  },
});