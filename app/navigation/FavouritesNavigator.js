import React from 'React';
import { createStackNavigator } from 'react-navigation';

import Header from '../components/Header';

import BrandsScreen from '../screens/BrandsScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import FuelScreen from '../screens/FuelScreen';

FavouritesScreen.navigationOptions = {
    headerRight: <Header />,
    tabBarLabel: 'Favourites',
};

const FavouritesNavigator = createStackNavigator(
    {
        Brands: { screen: BrandsScreen },
        Favourites: { screen: FavouritesScreen },
        Fuel: { screen: FuelScreen },
    },
    {
        initialRouteName: 'Favourites'
    }
);

export default FavouritesNavigator;