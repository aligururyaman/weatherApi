import { View, Text, StyleSheet } from 'react-native'
import React from 'react'


export default function LeftComp({ route }) {
    const { airPollutionData } = route.params;
    const { components } = airPollutionData.list[0];


    const componentsArray = Object.entries(components).map(([key, value]) => ({ key, value }));

    const groupedComponents = [];
    for (let i = 0; i < componentsArray.length; i += 4) {
        groupedComponents.push(componentsArray.slice(i, i + 4));
    }


    const getStatus = (value, thresholds) => {
        for (let i = 0; i < thresholds.length; i++) {
            if (value <= thresholds[i].limit) {
                return thresholds[i].status;
            }
        }
        return 'Very Poor';
    };

    const pollutantThresholds = {
        co: [{ limit: 4400, status: 'Good' }, { limit: 9400, status: 'Fair' }, { limit: 12400, status: 'Moderate' }, { limit: 15400, status: 'Poor' }],
        no: [{ limit: 40, status: 'Good' }, { limit: 70, status: 'Fair' }, { limit: 150, status: 'Moderate' }, { limit: 200, status: 'Poor' }],
        no2: [{ limit: 40, status: 'Good' }, { limit: 70, status: 'Fair' }, { limit: 150, status: 'Moderate' }, { limit: 200, status: 'Poor' }],
        o3: [{ limit: 60, status: 'Good' }, { limit: 120, status: 'Fair' }, { limit: 180, status: 'Moderate' }, { limit: 240, status: 'Poor' }],
        so2: [{ limit: 20, status: 'Good' }, { limit: 80, status: 'Fair' }, { limit: 250, status: 'Moderate' }, { limit: 350, status: 'Poor' }],
        pm2_5: [{ limit: 10, status: 'Good' }, { limit: 25, status: 'Fair' }, { limit: 50, status: 'Moderate' }, { limit: 75, status: 'Poor' }],
        pm10: [{ limit: 20, status: 'Good' }, { limit: 50, status: 'Fair' }, { limit: 100, status: 'Moderate' }, { limit: 200, status: 'Poor' }],
        nh3: [{ limit: 20, status: 'Good' }, { limit: 50, status: 'Fair' }, { limit: 100, status: 'Moderate' }, { limit: 200, status: 'Poor' }]
    };


  return (
    <View style={styles.container}>
                       
                {groupedComponents.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.rowContainer}>
                        {row.map(({ key, value }) => (
                            <View key={key} style={styles.detailFlat}>
                                <Text style={styles.detailFlatKey}>{key.toUpperCase()}</Text>
                                <Text style={styles.detailFlatValue}>
                                    {getStatus(value, pollutantThresholds[key] || [])}
                                </Text>
                            </View>
                        ))}
                    </View>
                ))}
                
            </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#16161F',
        borderRadius: 8,
        width: '50%',
        padding: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    detailFlat: {
        backgroundColor: '#16161F',
        borderRadius: 8,
        width: 45,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailFlatKey: {
        color: '#BFBFD4',
        fontSize: 8,
        fontFamily: 'Nunito-Bold',
    },
    detailFlatValue: {
        color: '#BFBFD4',
        fontSize: 8,
    },
});
