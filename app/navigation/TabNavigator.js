import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Colours from '../constants/Colours';
import { FavouritesIcon, MainIcon, InfoIcon } from '../constants/Icons';

import MainNavigator from './MainNavigator';
import SummaryNavigator from './SummaryNavigator';
import FavouritesNavigator from './FavouritesNavigator';

SummaryNavigator.navigationOptions = {
    tabBarIcon: InfoIcon,
    title: 'Summary',
};

MainNavigator.navigationOptions = {
    tabBarIcon: MainIcon,
    title: 'Main',
};

FavouritesNavigator.navigationOptions = {
    title: 'Favourites',
    tabBarIcon: FavouritesIcon,
};

export default createMaterialBottomTabNavigator(
    {
        SummaryNavigator,
        MainNavigator,
        FavouritesNavigator,
    },
    {
        activeTintColor: Colours.primary,
        initialRouteName: 'MainNavigator',
    }
);