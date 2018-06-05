import React from 'React';
import { createStackNavigator } from 'react-navigation';

import Header from '../components/Header';

import BrandsScreen from '../screens/BrandsScreen';
import FuelScreen from '../screens/FuelScreen';
import MainScreen from '../screens/MainScreen';
import MapScreen from '../screens/MapScreen';

MainScreen.navigationOptions = {
    headerRight: <Header />
};

MapScreen.navigationOptions = {
    headerRight: <Header />
};

const MainNavigator = createStackNavigator(
    {
        Brands: { screen: BrandsScreen },
        Fuel: { screen: FuelScreen },
        Main: { screen: MainScreen },
        Map: { screen: MapScreen },
    },
    {
        initialRouteName: 'Main'
    }
);

export default MainNavigator;