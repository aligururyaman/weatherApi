import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { get5Days, getCityData, getAir } from '../../../Redux/weatherSlice';
import { useCallback, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Location from 'expo-location';
import { EvilIcons } from '@expo/vector-icons';

const cities = require('../../Data/citiesData.json');

export default function SearchBarComp() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [query, setQuery] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);
    const [location, setLocation] = useState(null);

    const { citySearchLoading, forecastLoading } = useSelector((state) => state.weather);

    useFocusEffect(
        useCallback(() => {
          setQuery('');
        }, [])
      );

    const showErrorForThreeSeconds = (message) => {
        setError(message);
        setShowError(true);

        setTimeout(() => {
            setShowError(false);
            setError('');
        }, 3000);
    };

    async function getLocationAsync() {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            showErrorForThreeSeconds('Konum erişimi reddedildi.');
            return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);

        const address = await Location.reverseGeocodeAsync({
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
        });

        if (address.length > 0) {
            setQuery(address[0].city);
            return await fetchData(address[0].city);
        }
    }

    const handleSearch = (text) => {
        setQuery(text);
        if (text) {
            const filtered = cities.filter(city =>
                city.cityName.toLowerCase().startsWith(text.toLowerCase()) ||
                city.cityCountry.toLowerCase().startsWith(text.toLowerCase())
            );
            setFilteredCities(filtered);
        } else {
            setFilteredCities([]);
        }
    };

    const handleCitySelection = async (cityName) => {
        if (!cityName.trim()) {
            return;
        }
        setQuery(cityName);
        await fetchData(cityName);
    };
    

    const fetchData = async (city) => {
        try {
            const cityDataResult = await dispatch(getCityData({ city })).unwrap();
            if (cityDataResult && !cityDataResult.error) {
                const { lat, lon } = cityDataResult.coord;
                const forecastResult = await dispatch(get5Days({ lat, lon })).unwrap();
                const airPolResult = await dispatch(getAir({ lat, lon })).unwrap();
                navigation.navigate('Main', { data: cityDataResult, forecastData: forecastResult, airPollutionData: airPolResult });
            } else {
                throw new Error('Specified City Not Found. Please Try Again');
            }
        } catch (e) {
            showErrorForThreeSeconds(e.message || 'Error fetching city data');
        }
    };


    return (
        <View>
            {showError && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            )}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search Location"
                    placeholderTextColor="#7f7f98"
                    value={query}
                    onChangeText={handleSearch}
                    keyboardAppearance='dark'
                    onSubmitEditing={() => handleCitySelection(query)}
                />
                {(citySearchLoading || forecastLoading) && <ActivityIndicator size="small" color="#8FB2F5" />}
                <TouchableOpacity style={styles.locationIcon} onPress={getLocationAsync}>
                    <EvilIcons name="location" size={34} color="#BFBFD4" />
                </TouchableOpacity>
            </View>
            <View style={{ ...styles.flatCon, display: query.length > 0 && filteredCities.length > 0 ? 'flex' : 'none' }}>
                <View>
                    {filteredCities.slice(0, Math.min(filteredCities.length, 2)).map((city, index) => (
                        <View key={index} style={{...styles.resultsContainer, height: filteredCities.length >= 1 ? hp('5.5%') : hp('8%')}}>
                            <TouchableOpacity onPress={() => handleCitySelection(city.cityName)}>
                                <Text style={styles.item}>{city.cityName}, {city.cityCountry}</Text>
                            </TouchableOpacity>
                            {index < Math.min(filteredCities.length, 2) - 1 && <View style={styles.separator} />}
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    searchInput: {
        flex: 1,
        width: wp('75%'),
        fontSize: hp('2%'),
        fontFamily: 'Nunito-Regular',
        color: '#FAFAFA',
    },
    flatCon: {
        width: wp('75%'),
        backgroundColor: '#1E1E29',
        marginTop: 8,
        borderRadius: 8,
    },
    item: {
        fontSize: hp('2.2%'),
        lineHeight: hp('4%'),
        height: hp('5%'),
        color: '#FAFAFA',
        fontFamily: "Nunito-Bold",
        padding: hp('1%'),
        left: hp('1%')
    },
    separator: {
        height: 1,
        backgroundColor: '#3B3B54',
        width: '100%',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#1e1e29',
        borderRadius: 8,
        height: hp('6%'),
        width: wp('75%'),
        paddingHorizontal: 10,
    },
    errorContainer: {
        position: 'absolute',
        padding: 12,
        backgroundColor: 'red',
        borderRadius: 5,
        top: hp('-15%'),
        alignSelf: 'center',

    },
    errorText: {
        color: '#BFBFD4',
        fontFamily: "Nunito-Bold"
    },

});
