import { View, Text, ImageBackground, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import mainBg from '../Images/MainImages/backgroundMain.png'
import logo from '../Images/MainImages/Logo.png'
import { removeRecordedCity, getCityData, get5Days, getAir } from '../../Redux/weatherSlice';
import { useDispatch, useSelector } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, AntDesign } from '@expo/vector-icons';


export default function RecordedCities({ navigation }) {
  const dispatch = useDispatch();
  const cityList = useSelector(state => state.weather.recordedCities);

  const {
    citySearchLoading,
    forecastLoading,
  } = useSelector((state) => state.weather);

  const [loadings, setLoadings] = useState(true)
  const allLoadings = [citySearchLoading, forecastLoading]
  useEffect(() => {
    const isAnyChildLoading = allLoadings.some((state) => state)
    setLoadings(isAnyChildLoading)
  }, [allLoadings])

  const fetchData = async (city) => {
    try {
      const cityDataResult = await dispatch(getCityData({ city })).unwrap();
      if (cityDataResult && !cityDataResult.error) {
        const { lat, lon } = cityDataResult.coord;
        const forecastResult = await dispatch(get5Days({ lat, lon })).unwrap();
        const airPolResult = await dispatch(getAir({ lat, lon })).unwrap();
        return { cityData: cityDataResult, forecastData: forecastResult, airPollutionData: airPolResult };
      } else {
        console.error('An error occurred while loading weather data');
        return null;
      }
    } catch (error) {
      console.error('An error occurred during the data loading process:', error);
      return null;
    }
};

const goCity = async (city) => {
    setLoadings(true);

    const result = await fetchData(city);

    if (result && !result.error) {
      navigation.navigate('Main', { data: result.cityData, forecastData: result.forecastData, airPollutionData:result.airPollutionData });
    } else {
      console.error('An error occurred while loading data');
    }

    setLoadings(false);
};

  const removeCity = (city) => {
    dispatch(removeRecordedCity(city));
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground source={mainBg} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Image source={logo} style={{ left: '10%' }} />
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', right: '5%' }}>
            <TouchableOpacity onPress={() => goBack()}>
              <Ionicons name="arrow-back-circle-outline" size={34} color="#BFBFD4" />
            </TouchableOpacity>
          </View>
        </View>
        <View >
          {cityList.map((city, index) => (
            <TouchableOpacity key={index} style={styles.RecordTouch} onPress={() => goCity(city)}>
              <View style={styles.RecordBox}>
                <Text style={{ alignSelf: 'center', fontFamily: 'Nunito-Bold', fontSize: hp('3%'), marginLeft: 10, color: '#FAFAFA' }}>{city}</Text>
                <TouchableOpacity style={{ marginRight: 10, alignSelf: 'center' }} onPress={() => removeCity(city)}>
                  <AntDesign name="delete" size={34} color="#BFBFD4" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: wp('10%')
  },
  headerContainer: {
    backgroundColor: '#16161F',
    height: hp('8%'),
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row'
  },
  RecordBox: {
    backgroundColor: '#22222F',
    height: hp('10%'),
    margin: 8,
    justifyContent: 'space-between',
    padding: 10,
    flexDirection: 'row',
    borderRadius: 8
  },
  RecordTouch: {
    justifyContent: 'center',
  }
})