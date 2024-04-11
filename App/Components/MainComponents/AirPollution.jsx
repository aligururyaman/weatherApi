import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LeftComp from '../AirPollutionComponents/LeftComp';
import RightComp from '../AirPollutionComponents/RightComp';

export default function AirPollution({ route }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Air Pollution</Text>
            <View style={styles.contentContainer}>
                <LeftComp route={route}/>
                <RightComp route={route}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    title: {
        color: '#BFBFD4',
        fontFamily: 'Nunito-Bold',
        fontSize: 18,
        textAlign: 'center',
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});
