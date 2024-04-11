import { View, ImageBackground, StyleSheet, ScrollView } from 'react-native'
import mainBg from '../Images/MainImages/backgroundMain.png'
import { SafeAreaView } from 'react-native-safe-area-context'
import BottomFlat from '../Components/MainComponents/BottomFlat';
import DetailFlat from '../Components/MainComponents/DetailFlat';
import Header from '../Components/MainComponents/Header';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AirPollution from '../Components/MainComponents/AirPollution';
import WindDetail from '../Components/MainComponents/WindDetail';
import SunRiseSet from '../Components/MainComponents/SunRiseSet';

export default function Main({ route }) {

  return (
    <ImageBackground source={mainBg} style={{flex: 1}}>
      <SafeAreaView  style={styles.container}>
        <ScrollView>
          <View style={styles.headerContainer}>
            <Header route={route} />
          </View>
          <View style={styles.detailContainer}>
            <DetailFlat route={route} />
          </View>
          <View style={styles.bottomFlatContainer}>
            <BottomFlat route={route} />
          </View>
          <View style={styles.windContainer}>
            <WindDetail route={route} />
          </View>
          <View style={styles.sunContainer}>
            <SunRiseSet route={route} />
          </View>
          <View style={styles.airContainer}>
            <AirPollution route={route} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  )
}

  const styles = StyleSheet.create({
    container:{
      flex: 1
    },
    headerContainer:{
      height: hp('35%'),
      marginHorizontal: 6,
      marginVertical: 6,
      position: 'relative',
      backgroundColor: '#16161F',
      borderRadius: 8,
    },
    detailContainer:{
      marginHorizontal: 6,
      marginVertical: 6,
      height: hp('29%'),
      borderRadius:12,
      gap: 8,
      backgroundColor : '#16161F',
      paddingHorizontal: 10,
      padding: 5,
    },
    bottomFlatContainer: {
      backgroundColor: '#16161F',
      height: hp('15%'),
      borderRadius: 12,
      marginHorizontal: 6,
      marginVertical: 6,
      padding: 10,
    },
    airContainer: {
      backgroundColor: '#16161F',
      height: hp('15%'),
      borderRadius: 12,
      marginHorizontal: 6,
      marginVertical: 6,
    },
    windContainer: {
      backgroundColor: '#16161F',
      height: hp('18%'),
      borderRadius: 12,
      marginHorizontal: 6,
      marginVertical: 6,
    },
    sunContainer: {
      backgroundColor: '#16161F',
      height: hp('13%'),
      borderRadius: 12,
      marginHorizontal: 6,
      marginVertical: 6,
    }
  })