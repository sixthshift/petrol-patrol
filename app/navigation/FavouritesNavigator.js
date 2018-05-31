import React from 'React';
import { createStackNavigator } from 'react-navigation';

import Header from '../components/Header';

import FavouritesScreen from '../screens/FavouritesScreen';

FavouritesScreen.navigationOptions = {
    header: <Header />,
    tabBarLabel: 'Favourites',
};

const FavouritesNavigator = createStackNavigator(
    {
        Favourites: { screen: FavouritesScreen }
    }
);

export default FavouritesNavigator;