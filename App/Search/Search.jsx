import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity } from 'react-native'
import mainBg from '../Images/MainImages/backgroundMain.png'
import logo from '../Images/MainImages/Logo.png'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBarComp from '../Components/SearchComponents/SearchBarComp';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { MaterialIcons } from '@expo/vector-icons';


export default function Search() {
    const navigation = useNavigation();

    return (
        <ImageBackground source={mainBg} style={{ flex: 1, resizemode: 'cover' }}>
            <SafeAreaView style={styles.container}>
                <View style={styles.logoCon}>
                    <Image source={logo} style={styles.logoImg} />
                </View>
                <View style={styles.mainCon}>
                    <View style={styles.headerCon} >
                        <Text style={styles.headerTitle}>Welcome to <Text style={{ color: '#8fb2f5' }}>TypeWeather</Text></Text>
                        <Text style={styles.headerSubTitle}>Choose a location to see the weather forecast</Text>
                    </View>
                    <View>
                        <SearchBarComp />
                    </View>
                    <View style={styles.recordPage}>
                        <TouchableOpacity style={styles.recordLink} onPress={() => navigation.navigate('RecordedCities')}>
                            <MaterialIcons name="save-alt" size={34} color="#BFBFD4" />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoCon: {
        alignItems: 'center',
    },
    logoImg: {
        objectFit: 'contain',
        width: wp('40%'),
        height: hp('3%'),
        top: hp('10%'),
        opacity: 0.8,
    },
    mainCon: {
        width: 'auto',
        top: hp('30%'),
        alignSelf: 'center',
        flex: 1,
    },
    headerCon: {
        gap: 4,
        alignItems: 'center',
        marginBottom: 15
    },
    headerTitle: {
        color: '#fff',
        fontSize: hp('2%'),
        fontFamily: 'Nunito-Bold',
    },
    headerSubTitle: {
        color: '#BFBFD4',
        fontSize: hp('1.5%'),
        fontFamily: 'Nunito-Regular',
    },
    errorContainer: {
        marginTop: 20,
        height: 35,
        backgroundColor: '#1E1E29',
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorMessage: {
        color: '#FAFAFA',
        fontFamily: 'Nunito-Bold',
    },
    recordPage: {
        position: 'absolute',
        height: 70,
        top: '55%',
        alignItems: 'center',
        justifyContent: 'center',
        left: '20%'
    },
    recordLink: {
        width: wp('40%'),
        justifyContent: 'center',
        alignItems: 'center',
    },


});

