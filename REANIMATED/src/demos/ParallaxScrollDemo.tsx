import React from 'react';
import { StyleSheet, View, Text, StatusBar, Dimensions } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';

const {width}=Dimensions.get('window')
const HEADER_HEIGHT = 280;

export default function ParallaxScroll(){
  const scrollY=useSharedValue(0)

  const scrollHandler=useAnimatedScrollHandler({
    onScroll:(event) => {
      scrollY.value= event.contentOffset.y
    },
  })

  const headerAnimatedStye=useAnimatedStyle(() => {
    const scale=scrollY.value< 0 ? 1 - scrollY.value / HEADER_HEIGHT : 1;

    const tranlateY=scrollY.value>0 ? scrollY.value / 2 :0;

    return {
    transform:[
      {translateY:tranlateY},
      {scale: scale}
    ],
  }
})

  const textAnimatedStyle=useAnimatedStyle(() => {
    const opacity=interpolate(
      scrollY.value,
      [0,HEADER_HEIGHT*0.6],
      [1,0],
      Extrapolation.CLAMP
    );

    return {
      opacity: opacity
    }
  })

  return (
    <View style={styles.container}>
       <StatusBar barStyle="light-content" />

       <Animated.View style={[styles.header, headerAnimatedStye]}>
          <Animated.Image
          source={{uri:'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=60'}}
          style={styles.headerImage}
          
          />
        
        <Animated.View style={[styles.overlay, textAnimatedStyle]}>
          <Text style={styles.headerTitle}>Yosemite Valley</Text>
          <Text style={styles.headerSubtitle}>California, USA</Text>
        </Animated.View>

       </Animated.View>

       <Animated.ScrollView 
       onScroll={scrollHandler}
       scrollEventThrottle={16}
       contentContainerStyle={styles.scrollContent}
       >
         <View style={styles.card}>
          <Text style={styles.cardTitle}>About Yosemite</Text>
          <Text style={styles.cardText}>
            Yosemite National Park is in California's Sierra Nevada mountains.
            It's famed for its giant, ancient sequoia trees, and for Tunnel View,
            the iconic vista of towering Bridalveil Fall and the granite cliffs
            of El Capitan and Half Dome.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Hiking Trails</Text>
          <Text style={styles.cardText}>
            From easy walks to challenging multi-day hikes, Yosemite offers some
            of the most spectacular trails in the world. Famous routes include
            the Mist Trail, Half Dome Cables Route, and the Yosemite Falls Trail.
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Wildlife</Text>
          <Text style={styles.cardText}>
            The park is home to hundreds of wildlife species, including black
            bears, mule deer, bighorn sheep, and numerous bird species. Visitors
            are encouraged to keep food stored securely to protect the animals.
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Best Time to Visit</Text>
          <Text style={styles.cardText}>
            While spring brings spectacular waterfalls and wildflowers, summer
            offers full trail access. Fall is peaceful with golden foliage, and
            winter brings snow-covered granite peaks.
          </Text>
        </View>

       </Animated.ScrollView>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f10',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
    padding: 24,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 34,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    color: '#a1a1aa',
    fontSize: 16,
    marginTop: 6,
    fontWeight: '500',
  },
  scrollContent: {
    paddingTop: HEADER_HEIGHT, // Keeps space so the header is fully visible initially
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#1c1c1e',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2c2c2e',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    letterSpacing: 0.2,
  },
  cardText: {
    color: '#d1d1d6',
    fontSize: 16,
    lineHeight: 24,
  },
});