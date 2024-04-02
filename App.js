import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ImageBackground } from "react-native";
import mainBg from "./App/Images/MainImages/backgroundMain.png";
import Main from "./App/Main/Main";
import Search from "./App/Search/Search";
import loadFonts from './App/Utils/loadfonts'
import { useEffect, useState } from "react";
import LoadingScreen from "./App/Components/LoadingScreen";
import RecordedCities from "./App/RecordedCities/RecordedCities";
import { store } from "./Redux/store";
import { Provider } from "react-redux";



export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function fetchFonts() {
      await loadFonts();
      setFontsLoaded(true);
    }

    fetchFonts();
  }, []);

  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <ImageBackground source={mainBg} style={{ flex: 1}}>
        {fontsLoaded ? (
          <Stack.Navigator initialRouteName="Search">
            <Stack.Screen
            name="Search"
            component={Search}
            options={{ headerShown: false}}/>
            <Stack.Screen
            name="Main"
            component={Main}
            options={{ headerShown: false }}/>
            <Stack.Screen
            name="RecordedCities"
            component={RecordedCities}
            options={{ headerShown: false }}/>
          </Stack.Navigator>
          
        ) : (
          <LoadingScreen />
        )}
        </ImageBackground>
      </NavigationContainer>
      </Provider>
  );
}

