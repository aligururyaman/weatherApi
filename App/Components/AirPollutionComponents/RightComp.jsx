import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

export default function RightComp({ route }) {
    const { airPollutionData } = route.params;
    const [aqiLevel, setAqiLevel] = useState(airPollutionData.list[0].main.aqi);

    const getStatus = (value, thresholds) => {
        for (let i = 0; i < thresholds.length; i++) {
            if (value <= thresholds[i].limit) {
                return thresholds[i].status;
            }
        }
        return 'Very Poor';
    };

    const green = () => <MaterialCommunityIcons name="air-filter" size={24} color="green" />;

    return (
        <View style={styles.iconContainer}>
            <View style={styles.iconWrapper}>
                <Entypo name="air" size={24} color="#BFBFD4" />
                <Text style={styles.iconText}>Air Quality :</Text>
            </View>
            <View style={styles.iconWrapper}>
                <Text style={styles.aqiLevelText}>{getStatus(aqiLevel, [{ limit: 50, status: <>{`Good`} {green()}</> }, { limit: 100, status: 'Moderate' }, { limit: 150, status: 'Poor' }])}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5
    },
    iconWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    iconText: {
        color: '#BFBFD4',
        fontFamily: 'Nunito-Bold',
        fontSize: 16,
        marginLeft: 10,
    },
    aqiLevelText: {
        color: '#BFBFD4',
        fontFamily: 'Nunito-Bold',
        fontSize: 16,
        textAlign: 'center',
    },
});
