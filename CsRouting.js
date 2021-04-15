import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './CsFrequentUsage/CsRefNavigation';
import CsHome from './CsMainScreens/CsHome';
import CsSP from './CsMainScreens/CsSP';
import CsCart from './CsMainScreens/CsCart';
import CsFav from './CsMainScreens/CsFav';
import CsContact from './CsMainScreens/CsContact';
import CsConfirmOrder from './CsMainScreens/CsConfirmOrder';
import CsSearch from './CsMainScreens/CsSearch';
const Stack = createStackNavigator();

function Routes(props) {
  return (
    <NavigationContainer
      ref={(ref) => {
        Navigator.InitializeRefNavigation(ref);
      }}>
      <Stack.Navigator
        initialRouteName="CsHome"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="CsHome" component={CsHome} />
        <Stack.Screen name="CsSP" component={CsSP} />
        <Stack.Screen name="CsFav" component={CsFav} />
        <Stack.Screen name="CsCart" component={CsCart} />
        <Stack.Screen name="CsContact" component={CsContact} />
        <Stack.Screen name="CsConfirmOrder" component={CsConfirmOrder} />
        <Stack.Screen name="CsSearch" component={CsSearch} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
