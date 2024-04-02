import { View, Text, Image, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import {
  dayRain,
  dayStrom,
  daySun,
  dayClouds,
  dayFewCloud
} from '../../Utils/icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function BottomFlat({ route }) {

  const { forecastData } = route.params;

  const groupForecastByDay = forecastData.list.reduce((acc, record) => {
    const date = new Date(record.dt * 1000).toDateString();
    if (!acc[date]) {
      acc[date] = {
        date,
        temps: [],
        description: record.weather[0].description,
        icon: record.weather[0].icon
      };
    }

    acc[date].temps.push(record.main.temp);
    return acc;
  }, {});

  const dailyForecast = Object.values(groupForecastByDay).map(day => ({
    date: day.date,
    maxTemp: Math.max(...day.temps),
    minTemp: Math.min(...day.temps),
    description: day.description,
    icon: day.icon
  }));


  return (
    <View style={styles.bottomFlat}>
      <FlatList
        horizontal={true}
        scrollEnabled={true}
        data={dailyForecast}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          let bottomFlatImg;
          switch (item.description) {
            case "broken clouds":
              bottomFlatImg = dayFewCloud
              break;
            case "clear sky":
              bottomFlatImg = daySun
              break;
            case "overcast clouds":
              bottomFlatImg = dayClouds
              break;
            case "rain":
              bottomFlatImg = dayRain
              break;
            case "strom":
              bottomFlatImg = dayStrom
              break;
            case "mist":
              bottomFlatImg = dayClouds
              break;
            case "scattered clouds":
              bottomFlatImg = dayClouds
              break;
            case "few clouds":
              bottomFlatImg = dayFewCloud
              break;
            case "moderate rain":
              bottomFlatImg = dayRain
              break;

            default:
              bottomFlatImg = daySun;
          }

          return (
            <View style={styles.bottomFlatList}>
              <Text style={{ height: 40, lineHeight: 50, fontFamily: 'Nunito-Bold', color: '#BFBFD4', fontSize: 16 }}>
                {new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' })}
              </Text>
              <Image source={bottomFlatImg} style={styles.bottomFlatImgStyle} />
              <Text style={{ height: 20, lineHeight: 25, fontFamily: 'Nunito-Bold', fontSize: 16, color: '#FAFAFA' }}>
                {Math.round(item.maxTemp)}°C
              </Text>
              <Text style={{ height: 20, lineHeight: 25, fontFamily: 'Nunito-Regular', fontSize: 12, color: '#7F7F98' }}>
                {Math.round(item.minTemp)}°C
              </Text>
            </View>
          );
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  bottomFlatList: {
    alignItems: 'center',
    width: wp('24%'),

  },
  bottomFlatImgStyle: {
    resizeMode: 'contain',
    height: hp('6%')
  }
})