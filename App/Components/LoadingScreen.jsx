import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Video } from 'expo-av';

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <Video
        source={require('../Images/MainImages/loading.mp4')} // Video dosyanızın yolu
        style={styles.backgroundVideo}
        isMuted={true}
        shouldPlay={true}
        resizeMode="cover"
        isLooping
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%'
  },
});
