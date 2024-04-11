import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';

export default function SunRiseSet({ route }) {

    const { data } = route.params;

    const formatUnixTime = (unixTime) => {
        const dateObj = new Date(unixTime * 1000);
        const hours = String(dateObj.getHours()).padStart(2, '0');
        const minutes = String(dateObj.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };
    

  return (
    <View style={styles.container}>
        <View style={styles.sunRiseContainer}>
            <Feather name="sunrise" size={34} color="white" />
            <Text style={styles.text}>Sunrise : {formatUnixTime(data.sys.sunrise)}</Text>
        </View>
        <View style={styles.sunSetContainer}>
            <Feather name="sunset" size={34} color="white" />
            <Text style={styles.text}>Sunset : {formatUnixTime(data.sys.sunset)}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    sunRiseContainer: {
        top: '5%',
        width: '50%',
        alignItems: 'center',
        gap: 20
    },
    sunSetContainer: {
        top: '5%',
        width: '50%',
        alignItems: 'center',
        gap: 20
    },
    text: {
      fontSize: 18,
      marginBottom: 10,
      color: 'white'
    },
  });