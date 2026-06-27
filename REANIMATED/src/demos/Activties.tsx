import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import Svg, { Path, Ellipse } from 'react-native-svg';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withRepeat,
    withTiming,
    withDelay,
    Easing,
    interpolate,      
    Extrapolation, 
} from 'react-native-reanimated';

const { height, width } = Dimensions.get('window')

const AnimatedPath = Animated.createAnimatedComponent(Path)

export default function Activities() {
    const masterClock=useSharedValue(0)

    const notchRotation = useSharedValue(0)

    useEffect(() => {
        notchRotation.value=0
        notchRotation.value = withRepeat(
            withTiming(360, { duration: 2000, easing: Easing.linear }),
            -1,
            false
        )

       masterClock.value=0
       masterClock.value=withRepeat(
        withTiming(1, {duration:7000, easing: Easing.linear}),
        -1,
    false,
       )
    }, [])

    const yellowStyle = useAnimatedStyle(() => {
        const translateY=interpolate(
            masterClock.value,
            [0.0,0.2,0.75,0.95],
            [600,0,0-600],
            Extrapolation.CLAMP
        )
        const opacity = interpolate(
            masterClock.value,
            [0.0, 0.15, 0.8, 0.95],
            [0, 1, 1, 0],
            Extrapolation.CLAMP
        );

        return {
            opacity,
            transform:[
                {translateY},
                {rotate:'-18deg'}
            ]
        }
    })

    const pinkStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            masterClock.value,
            [0.05, 0.25, 0.8, 1.0],
            [600, 0, 0, -600],
            Extrapolation.CLAMP
        );
        const opacity = interpolate(
            masterClock.value,
            [0.05, 0.2, 0.85, 1.0],
            [0, 1, 1, 0],
            Extrapolation.CLAMP
        );
        return {
            opacity,
            transform: [
                { translateY },
                { rotate: '12deg' }
            ]
        };
    })
    const blueStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            masterClock.value,
            [0.1, 0.3, 0.8, 1.0],
            [600, 0, 0, -600],
            Extrapolation.CLAMP
        );
        const opacity = interpolate(
            masterClock.value,
            [0.1, 0.25, 0.85, 1.0],
            [0, 1, 1, 0],
            Extrapolation.CLAMP
        );
        return {
            opacity,
            transform: [
                { translateY }
            ]
        };
    })

    const notchStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${notchRotation.value}deg` }]
    }))

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.notchWrapper}>
                <Animated.View style={[styles.notchContainer, notchStyle]}>
                    <Svg width={240} height={240} viewBox="0 0 395.833 385">
                        <Path
                            fill="#A5C695" // Soft Green
                            d="m120.11 374.41c-13.809 9.032-24.1 2.959-22.869-13.494l6.163-82.418c1.23-16.453-8.282-38.377-21.139-48.719l-64.398-51.8c-12.857-10.342-10.262-22.006 5.767-25.92l80.287-19.606c16.029-3.915 33.94-19.736 39.803-35.16l29.364-77.254c5.863-15.423 17.758-16.56 26.434-2.524l43.458 70.298c8.676 14.035 29.258 26.18 45.738 26.99l82.547 4.055c16.48 0.81 21.236 11.771 10.569 24.359l-53.429 63.054c-10.667 12.588-15.857 35.916-11.535 51.84l21.652 79.759c4.322 15.924-4.633 23.835-19.901 17.58l-76.479-31.329c-15.269-6.255-39.059-3.982-52.867 5.05l-69.15 45.24z"
                        />
                        <Path
                            stroke="#789E6B"
                            strokeMiterlimit={10}
                            d="m120.11 374.41c-13.809 9.032-24.1 2.959-22.869-13.494l6.163-82.418c1.23-16.453-8.282-38.377-21.139-48.719l-64.398-51.8c-12.857-10.342-10.262-22.006 5.767-25.92l80.287-19.606c16.029-3.915 33.94-19.736 39.803-35.16l29.364-77.254c5.863-15.423 17.758-16.56 26.434-2.524l43.458 70.298c8.676 14.035 29.258 26.18 45.738 26.99l82.547 4.055c16.48 0.81 21.236 11.771 10.569 24.359l-53.429 63.054c-10.667 12.588-15.857 35.916-11.535 51.84l21.652 79.759c4.322 15.924-4.633 23.835-19.901 17.58l-76.479-31.329c-15.269-6.255-39.059-3.982-52.867 5.05l-69.15 45.24z"
                            fill="none"
                        />
                    </Svg>


                </Animated.View>

            </View>
            <View style={styles.headerConatiner}>
                <Text style={styles.mainTitle}>Activities</Text>
                <Text style={styles.mainTitleLight}>just for your</Text>
                <Text style={styles.mainTitle}>taste</Text>
            </View>

            <View style={styles.contentContainer}>

                <Animated.View style={[styles.yellowCard, yellowStyle]}>
                    <Text style={styles.cardTitle}>Opera</Text>
                    <Text style={styles.cardDate}>23/04/24</Text>
                </Animated.View>

                <Animated.View style={[styles.pinkCard, pinkStyle]}>
                    <Svg width={180} height={180} viewBox="0 0 395.833 385" style={{ position: 'absolute' }}>
                        <Path
                            fill="#FFA3A1"
                            d="m120.11 374.41c-13.809 9.032-24.1 2.959-22.869-13.494l6.163-82.418c1.23-16.453-8.282-38.377-21.139-48.719l-64.398-51.8c-12.857-10.342-10.262-22.006 5.767-25.92l80.287-19.606c16.029-3.915 33.94-19.736 39.803-35.16l29.364-77.254c5.863-15.423 17.758-16.56 26.434-2.524l43.458 70.298c8.676 14.035 29.258 26.18 45.738 26.99l82.547 4.055c16.48 0.81 21.236 11.771 10.569 24.359l-53.429 63.054c-10.667 12.588-15.857 35.916-11.535 51.84l21.652 79.759c4.322 15.924-4.633 23.835-19.901 17.58l-76.479-31.329c-15.269-6.255-39.059-3.982-52.867 5.05l-69.15 45.24z"
                        />
                        <Path
                            stroke="#789E6B"
                            strokeMiterlimit={10}
                            d="m120.11 374.41c-13.809 9.032-24.1 2.959-22.869-13.494l6.163-82.418c1.23-16.453-8.282-38.377-21.139-48.719l-64.398-51.8c-12.857-10.342-10.262-22.006 5.767-25.92l80.287-19.606c16.029-3.915 33.94-19.736 39.803-35.16l29.364-77.254c5.863-15.423 17.758-16.56 26.434-2.524l43.458 70.298c8.676 14.035 29.258 26.18 45.738 26.99l82.547 4.055c16.48 0.81 21.236 11.771 10.569 24.359l-53.429 63.054c-10.667 12.588-15.857 35.916-11.535 51.84l21.652 79.759c4.322 15.924-4.633 23.835-19.901 17.58l-76.479-31.329c-15.269-6.255-39.059-3.982-52.867 5.05l-69.15 45.24z"
                            fill="none"
                        />
                    </Svg>
                    <View style={styles.centerTextContainer}>
                        <Text style={styles.cardTitle}>Festival</Text>
                        <Text style={styles.cardDate}>30/05/24</Text>
                    </View>

                </Animated.View >

                <Animated.View style={[styles.blueCard, blueStyle]}>
                    <Text style={styles.cardTitle}>Charity event</Text>
          <Text style={styles.cardDate}>10/05/24</Text>

          
                </Animated.View>

                <View style={styles.promptContainer}>
            <Text style={styles.promptText}>Have you</Text>
          <Text style={styles.promptText}>picked</Text>
          <Text style={styles.promptText}>your next</Text>
          <Text style={styles.promptText}>event?</Text>
          </View>

          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>Start →</Text>

          </TouchableOpacity>
            </View>

        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F6EE',
    },
    notchWrapper: {
        position: 'absolute',
        top: -120,
        left: (width - 240) / 2,
        width: 240,
        height: 240,
        alignItems: 'center',
        justifyContent: 'center'

    },
    notchContainer: {
        width: 240,
        height: 240

    },
    headerConatiner: {
        marginTop: 150,
        paddingHorizontal: 26,
    },
    mainTitle: {
        fontSize: 50,
        fontWeight: '600',
        color: '#1a1a1a',
        lineHeight: 52,
        letterSpacing: -1
    },
    mainTitleLight: {
        fontSize: 48,
        fontWeight: '300',
        fontStyle: 'italic',
        color: '#1a1a1a',
        lineHeight: 52,
        letterSpacing: -1,
        paddingHorizontal: 7
    },
    contentContainer: {
        flex: 1,
        position: 'relative',
        marginTop: 10
    },
    yellowCard: {
        position: 'absolute',
        top: -50,
        right: -10,
        width: 250,
        height: 250,
        backgroundColor: '#FFE780',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 15,
        elevation: 3,
        borderRadius: 16

    },
    pinkCard: {
        position: 'absolute',
        top: 30,
        left: -10,
        width: 140,
        height: 140,
        justifyContent: 'center',
        alignItems: 'center',
    },
    blueCard:{
        position:'absolute',
        bottom:80,
        left:-35,
        width:240,
        height:240,
        borderRadius: 120,
    backgroundColor: '#87CCE8',
    justifyContent:'center',
    alignItems:'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 3,
    },
    centerTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        transform: [{ rotate: '-50deg' }],
    },

    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a1a1a',
        letterSpacing: -0.5,
    },

    cardDate: {
        fontSize: 14,
        color: '#555555',
        marginTop: 4,
        fontWeight: '500',
    },
    promptContainer:{
        position:'absolute',
        bottom:150,
        right:40,
        alignItems: 'flex-start',
    },
    promptText:{
        fontSize:18,
        fontWeight:'500',
        color: '#555555',
    lineHeight: 22,
    },
    startButton:{
        position: 'absolute',
        bottom:60,
        right:20,
        backgroundColor: '#000000',
        borderRadius:30,
        paddingVertical:16,
         paddingHorizontal: 36,
         shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    },
    startButtonText:{
        color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
    }


})