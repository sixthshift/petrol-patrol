import React from 'React';
import { createStackNavigator } from 'react-navigation';

import Header from '../components/Header';

import MainScreen from '../screens/MainScreen';
import MapScreen from '../screens/MapScreen';

MainScreen.navigationOptions = {
    header: <Header />
};

MapScreen.navigationOptions = {
    header: <Header />
};

const MainNavigator = createStackNavigator(
    {
        Main: { screen: MainScreen },
        Map: { screen: MapScreen },
    }
);

export default MainNavigator;