import { View, ImageBackground, StyleSheet } from 'react-native'
import mainBg from '../Images/MainImages/backgroundMain.png'
import { SafeAreaView } from 'react-native-safe-area-context'
import BottomFlat from '../Components/MainComponents/BottomFlat';
import DetailFlat from '../Components/MainComponents/DetailFlat';
import Header from '../Components/MainComponents/Header';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function Main({ route }) {

  return (
    <ImageBackground source={mainBg} style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Header route={route} />
        </View>
        <View style={styles.detailContainer}>
          <DetailFlat route={route} />
        </View>
        <View style={styles.bottomFlatContainer}>
          <BottomFlat route={route} />
        </View>
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
      marginHorizontal:4,
      marginVertical:4,
      position: 'relative',
      backgroundColor: '#16161F',
      borderRadius: 8,
    },
    detailContainer:{
      marginHorizontal:4,
      marginVertical:4,
      height: hp('35%'),
      borderRadius:12,
      gap: 8,
      backgroundColor : '#16161F',
      paddingHorizontal: 10,
      padding: 5,
    },
    bottomFlatContainer: {
      backgroundColor: '#16161F',
      width: '99%',
      height: hp('25%'),
      borderRadius: 12,
      marginHorizontal: 4,
      marginVertical: 4,
      padding: 10,
    },
  })