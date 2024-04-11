import { View, Text, Image, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function DetailFlat({ route }) {

  const { data, forecastData } = route.params;

  const ListData = [
    { id: '1', icon: require('../../Images/vectors/tempVector.png'), title: 'Thermal sensation', listData: `${Math.round(data.main.temp)}ºc` },
    { id: '2', icon: require('../../Images/vectors/rainVector.png'), title: 'Probability of rain', listData: `${Math.round(forecastData.list[0].pop)}%` },
    { id: '3', icon: require('../../Images/vectors/windVector.png'), title: 'Wind speed', listData: `${Math.round(data.wind.speed)} km/h` },
    { id: '4', icon: require('../../Images/vectors/humidityVector.png'), title: 'Air humidity', listData: `${Math.round(data.main.humidity)}%` },
  ];

  return (
    <View style={styles.detailList}>
      <FlatList
        scrollEnabled={false}
        data={ListData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          <View style={styles.detailFlat}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ width: wp('5%') }} >
                <Image source={item.icon} />
              </View>

              <Text style={[styles.detailFlatListItem, { left: wp('4%') }]}>{item.title}</Text>
            </View>
            <View>
              <Text style={styles.detailFlatListItem}>{item.listData}</Text>
            </View>
          </View>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  detailList: {
    backgroundColor: '#16161F',
    borderRadius: 8,
  },
  detailFlat: {
    height: hp('7%'),
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    justifyContent: 'space-between',
    color: '#BFBFD4',
  },
  detailFlatListItem: {
    color: '#BFBFD4',
  }
})