import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { get5Days, getCityData } from '../../../Redux/weatherSlice';
import { useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const cities = require('../../Data/citiesData.json');


export default function SearchBarComp() {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [query, setQuery] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const [loadings, setLoadings] = useState();
    const [selectedCity, setSelectedCity] = useState('');
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);

    const {
        citySearchLoading,
        citySearchData,
        forecastLoading,
        forecastData,
        forecastError
    } = useSelector((state) => state.weather);

    const showErrorForThreeSeconds = (message) => {
        setError(message);
        setShowError(true);

        setTimeout(() => {
            setShowError(false);
            setError('');
        }, 3000);
    };

    const handleSearch = (text) => {
        setQuery(text);
        if (text) {
            const filtered = cities.filter(city =>
                city.cityName && city.cityName.toLowerCase().startsWith(text.toLowerCase()) ||
                city.cityCountry && city.cityCountry.toLowerCase().startsWith(text.toLowerCase())
            );
            setFilteredCities(filtered);
        } else {
            setFilteredCities([]);
        }
    };

    const handleCitySelection = async (cityName) => {
        await fetchData(cityName);
        setSelectedCity(cityName);


    };
    const handleOnEndEditing = async () => {
        if (query) {
            await fetchData(query);
        }
    };

    const fetchData = async (city) => {
        try {
            const cityDataResult = await dispatch(getCityData({ city })).unwrap();
            if (cityDataResult && !cityDataResult.error) {
                const { lat, lon } = cityDataResult.coord;
                const foreCastResult = await dispatch(get5Days({ lat, lon })).unwrap();
                navigation.navigate('Main', { data : cityDataResult, forecastData: foreCastResult });
                setError('');
            } else {
                throw new Error('Specified City Not Found. Please Try Again');
            }
        } catch (e) {
            showErrorForThreeSeconds(e.message || 'Error fetching city data');
        }
    };


    const ItemSeparator = () => (
        <View style={styles.separator} />
    );


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
                    placeholder="Search location"
                    placeholderTextColor="#7f7f98"
                    value={loadings ? selectedCity : query}
                    onChangeText={handleSearch}
                    onEndEditing={handleOnEndEditing}
                />
                {(citySearchLoading || forecastLoading) && <ActivityIndicator size="small" color="#8FB2F5" />}
            </View>
            <View style={{ ...styles.flatCon, display: query.length > 0 && filteredCities.length > 0 ? 'flex' : 'none' }}>
                <FlatList
                    style={styles.flatList}
                    data={filteredCities}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleCitySelection(item.cityName)}>
                            <Text style={styles.item}>{item.cityName}, {item.cityCountry}</Text>
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={ItemSeparator}
                />
            </View>
        </View>
    )
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
        height: hp('10%'),
        backgroundColor: '#1E1E29',
        marginTop: 8,
        borderRadius: 8,
    },

    item: {
        fontSize: hp('2%'),
        height: hp('5%'),
        color: '#FAFAFA',
        fontFamily: "Nunito-Bold",
        padding: hp('1%'),
        left: hp('1%')
    },
    separator: {
        height: 0.5,
        backgroundColor: '#13131A',
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
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 5,
    },
    errorText: {
        color: 'white',
    },
})