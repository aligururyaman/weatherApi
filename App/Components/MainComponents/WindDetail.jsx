import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import compassImg from '../../Images/appImg/wind.png'
import { Feather , Fontisto, Entypo  } from '@expo/vector-icons';

export default function WindDetail({ route }) {
  const { data } = route.params;

  const iconStyle = {
    position: 'absolute',
    transform: [{ rotate: `${data.wind.deg}deg` }]
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          <Feather name="wind" size={24} color="#FAFAFA" />
          <Text> Wind Speed : </Text>
          {data.wind.speed} km/h
          </Text>
        <Text style={styles.infoText}>
        <Entypo name="compass" size={24} color="#FAFAFA" />
          <Text> Wind Deg : </Text>
          {data.wind.deg}º
          </Text>
      </View>
      <View style={styles.imgContainer}>
        <Image source={compassImg} style={styles.img}/>
        <Fontisto name="arrow-right-l" size={110} color="red" style={iconStyle}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  infoContainer: {
    justifyContent: 'center',
    padding: 10,
    gap: 15,
    margin: 20
  },
  infoText: {
    fontFamily: 'Nunito-Bold',
    color: '#FAFAFA',
    fontSize: 18,
  },
  imgContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    width: 150,
    height: 150
  }
})
