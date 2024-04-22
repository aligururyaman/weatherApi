import React, { useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ImageBackground, StatusBar } from "react-native";
import mainBg from "./App/Images/MainImages/backgroundMain.png";
import Main from "./App/Main/Main";
import Search from "./App/Search/Search";
import loadFonts from './App/Utils/loadfonts';
import LoadingScreen from "./App/Components/LoadingScreen";
import RecordedCities from "./App/RecordedCities/RecordedCities";
import { store } from "./Redux/store";
import { Provider } from "react-redux";
import { setRecordedCities } from './Redux/weatherSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const storageAsync = async () => {
      await loadFonts();
      const savedCities = await AsyncStorage.getItem('recordedCities');
      if (savedCities) {
        store.dispatch(setRecordedCities(JSON.parse(savedCities)));
      }
      setFontsLoaded(true);
    };

    storageAsync();
  }, []);

  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <ImageBackground source={mainBg} style={{ flex: 1 }}>
          {fontsLoaded ? (
            <Stack.Navigator initialRouteName="Search">
              <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
              <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
              <Stack.Screen name="RecordedCities" component={RecordedCities} options={{ headerShown: false }} />
            </Stack.Navigator>
          ) : (
            <LoadingScreen />
          )}
        </ImageBackground>
      </NavigationContainer>
    </Provider>
  );
}
