import React from 'React';
import { createStackNavigator } from 'react-navigation';

import Header from '../components/Header';

import BrandsScreen from '../screens/BrandsScreen';
import FuelScreen from '../screens/FuelScreen';
import SummaryScreen from '../screens/SummaryScreen';

SummaryScreen.navigationOptions = {
    headerRight: <Header />,
    tabBarLabel: 'Summary',
};

const SummaryNavigator = createStackNavigator(
    {
        Brands: { screen: BrandsScreen },
        Fuel: { screen: FuelScreen },
        Summary: { screen: SummaryScreen },
    },
    {
        initialRouteName: 'Summary'
    }
);

export default SummaryNavigator;