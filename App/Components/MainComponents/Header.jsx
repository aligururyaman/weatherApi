import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { addRecordedCity } from '../../../Redux/weatherSlice'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import {
  nightFewClouds,
  dayFewClouds,
  nightClearSky,
  dayClearSky,
  nightCloudy,
  dayCloudy,
  nightRain,
  dayRain,
  dayStrom,
  nightStrom,
  nightFewCloudsBg,
  dayFewCloudsBg,
  nightClearSkyBg,
  dayClearSkyBg,
  nightCloudyBg,
  dayCloudyBg,
  nightRainBg,
  dayRainBg,
  dayStromBg,
  nightStromBg,
} from '../../Utils/icons';
import { useNavigation } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { MaterialIcons, AntDesign, Octicons  } from '@expo/vector-icons';

export default function Header({ route }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const currentDate = new Date();

  const { data, forecastData } = route.params;

  const dateString = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });



  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = currentTime ? currentTime.getHours() : 0;

  const isDayTime = hours >= 6 && hours <= 18;



  const addRecordCities = () => {
    dispatch(addRecordedCity(data.name));
    navigation.navigate('RecordedCities');
  };

  const weatherDescription = data.weather[0].description;

  let iconSource,imageBgSource;
    switch (weatherDescription) {
      case "broken clouds":
        iconSource = isDayTime ? dayFewClouds : nightFewClouds;
        imageBgSource = isDayTime ? dayFewCloudsBg : nightFewCloudsBg;
        break;
      case "clear sky":
        iconSource = isDayTime ? dayClearSky : nightClearSky;
        imageBgSource = isDayTime ? dayClearSkyBg : nightClearSkyBg;
        break;
      case "overcast clouds":
        iconSource = isDayTime ? dayCloudy : nightCloudy;
        imageBgSource = isDayTime ? dayCloudyBg : nightCloudyBg;
        break;
      case "rain":
        iconSource = isDayTime ? dayRain : nightRain;
        imageBgSource = isDayTime ? dayRainBg : nightRainBg;
        break;
      case "strom":
        iconSource = isDayTime ? dayStrom : nightStrom;
        imageBgSource = isDayTime ? dayStromBg : nightStromBg
        break;
      case "mist":
        iconSource = isDayTime ? dayCloudy : nightCloudy;
        imageBgSource = isDayTime ? dayCloudyBg : nightCloudyBg;
        break;
      case "scattered clouds":
        iconSource = isDayTime ? dayCloudy : nightCloudy;
        iconSource = isDayTime ? dayCloudyBg : nightCloudyBg;
        break;
      case "few clouds":
        iconSource = isDayTime ? dayFewClouds : nightFewClouds;
        imageBgSource = isDayTime ? dayFewCloudsBg : nightFewCloudsBg;
        break;
      case "moderate rain":
        iconSource = isDayTime ? dayRain : nightRain;
        imageBgSource = isDayTime ? dayRainBg : nightRainBg;
        break;
    }


  const showRecordCities = () => {
    navigation.navigate('RecordedCities')

  }


  return (
    <View style={styles.container}>
      <Image source={imageBgSource} style={styles.headerImg} />
      <View style={styles.headerCityContainer}>
        <View style={styles.headerCity}>
          <View style={{ gap: 2 }}>
            <Text style={styles.headerCityName}>{data.name}, {data.sys.country}</Text>
            <Text style={styles.headerCityDate}>{dateString}</Text>
          </View>
          <TouchableOpacity onPress={addRecordCities}>
            <Octicons name="diff-added" size={34} color="#BFBFD4" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.TempContainer}>
        <Text style={styles.tempTitle}>{Math.round(data.main.temp)}ºc</Text>
        <View>
          <Text style={styles.tempFeels}>{Math.round(data.main.temp_min)}ºc / {Math.round(data.main.temp_max)}ºc</Text>
          <Text style={styles.tempClouds}>{data.weather[0].description}</Text>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <Image source={iconSource} style={styles.icon} />
      </View>
      <View style={{ position: 'absolute', left: wp('85%'), top: hp('2%') }}>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <AntDesign name="home" size={34} color="#BFBFD4" />
        </TouchableOpacity>
      </View>
      <View style={{ position: 'absolute', left: wp('85%'), top: hp('8%') }}>
        <TouchableOpacity onPress={showRecordCities}>
          <MaterialIcons name="save-alt" size={34} color="#BFBFD4" />
        </TouchableOpacity>

      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  headerContainer: {
    marginHorizontal: 4,
    marginVertical: 4,
    position: 'relative',
    backgroundColor: '#16161F',
  },
  headerImg: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  headerCityContainer: {
    position: 'absolute',
    top: hp('2%'),
    left: hp('2%'),

  },
  headerCity: {
    flexDirection: 'row',
    width: 160,
    height: hp('8%'),
    gap: 5
  },
  headerCityName: {
    fontFamily: 'Nunito-Bold',
    fontSize: hp('3%'),
    color: '#FAFAFA',
    width: wp('50%'),
    height: hp('4%')
  },
  headerCityDate: {
    fontFamily: 'Nunito-Regular',
    fontSize: hp('2½'),
    color: '#FAFAFA'
  },
  TempContainer: {
    position: 'absolute',
    top: hp('19%'),
    left: hp('1%'),
    padding: 10,

  },
  tempTitle: {
    height: hp('7%'),
    fontFamily: 'Nunito-Bold',
    fontSize: hp('5%'),
    color: '#FFFFFF'
  },
  tempFeels: {
    height: hp('3%'),
    fontFamily: 'Nunito-Bold',
    fontSize: hp('2%'),
    color: '#FFFFFF'
  },
  tempClouds: {
    fontFamily: 'Nunito-Regular',
    fontSize: hp('2%'),
    color: '#FFFFFF'
  },
  iconContainer: {
    position: 'absolute',
    width: wp('15%'),
    height: hp('15%'),
    top: hp('20%'),
    left: wp('70%'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {

  },

})