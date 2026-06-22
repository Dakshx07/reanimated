import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import Animated, { 
  FadeIn, 
  FadeOut, 
  SlideInLeft, 
  SlideOutRight,
  ZoomIn,
  ZoomOut,
  LinearTransition
} from 'react-native-reanimated';

export default function LayoutAnimationDemo(){
  const [show,setShow]=useState(false)
  const [activeCards,setActiveCards]=useState(['fade','slide','zoom'])

  const removeCards=(type: string) => {
    setActiveCards(prev => prev.filter(c => c !== type))
  }

  const resetCards=() => {
    setActiveCards(['fade','slide','zoom'])
  }

  const handleToggle=() =>{ 
    setShow(prev => !prev)
  }
  return (
    <View style={styles.container}>
      <Button title={show ?'Hide Cards' :'Show Cards'} onPress={handleToggle}/>
 <Button title="Reset Cards" onPress={resetCards} />
      <View style={styles.cardContainer}>
        {show && (
          <>
          {activeCards.includes('fade') && (
            <Animated.View
            entering={FadeIn.duration(400)}
              exiting={FadeOut.duration(400)}
              layout={LinearTransition.springify()}
               style={[styles.card, styles.fadeCard]}
            >
              <Text style={styles.text}>Fade In/Out</Text>
               <Button title="Remove" color="white" onPress={() => removeCards('fade')} />
            </Animated.View>
          )}

          {activeCards.includes('slide') && (
            <Animated.View
              entering={SlideInLeft.duration(500)}
              exiting={SlideOutRight.duration(500)}
              layout={LinearTransition.springify()}
              style={[styles.card, styles.slideCard]}
            >
              <Text style={styles.text}>Slide Left/Right</Text>
              <Button title="Remove" color="white" onPress={() => removeCards('slide')} />
            </Animated.View>
          )}
          {/* Card 3: Zoom */}
          {activeCards.includes('zoom') && (
            <Animated.View 
              entering={ZoomIn.duration(300)} 
              exiting={ZoomOut.duration(300)} 
              layout={LinearTransition.springify()}
              style={[styles.card, styles.zoomCard]}
            >
              <Text style={styles.text}>Zoom In/Out</Text>
              <Button title="Remove" color="white" onPress={() => removeCards('zoom')} />
            </Animated.View>
          )}
          

          </>
        )}
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c1e',
    paddingTop: 50,
  },
  cardContainer: {
    marginTop: 40,
    gap: 20,
    width: '80%',
  },
  card: {
    height: 100,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  fadeCard: { backgroundColor: '#ff9500' },
  slideCard: { backgroundColor: '#30d158' },
  zoomCard: { backgroundColor: '#5856d6' },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});