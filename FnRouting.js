import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './FnFrequentUsage/FnRefNavigation';
import FnHome from './FnMainScreens/FnHome';
import FnSP from './FnMainScreens/FnSP';
// import FnCart from './FnMainScreens/FnCart';
import FnFav from './FnMainScreens/FnFav';
import FnContact from './FnMainScreens/FnContact';
// import FnConfirmOrder from './FnMainScreens/FnConfirmOrder';
import FnSearch from './FnMainScreens/FnSearch';
const Stack = createStackNavigator();

function Routes(props) {
  return (
    <NavigationContainer
      ref={(ref) => {
        Navigator.InitializeRefNavigation(ref);
      }}>
      <Stack.Navigator
        initialRouteName="FnHome"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="FnHome" component={FnHome} />
        <Stack.Screen name="FnSP" component={FnSP} />
        <Stack.Screen name="FnFav" component={FnFav} />
        {/* <Stack.Screen name="FnCart" component={FnCart} /> */}
        <Stack.Screen name="FnContact" component={FnContact} />
        {/* <Stack.Screen name="FnConfirmOrder" component={FnConfirmOrder} /> */}
        <Stack.Screen name="FnSearch" component={FnSearch} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
