import PropTypes from 'prop-types';
import React from 'React';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import MainNavigator from './MainNavigator';
import SummaryNavigator from './SummaryNavigator';
import FavouritesNavigator from './FavouritesNavigator';
import Colours from '../constants/Colours';

const summaryIcon = ({ tintColor }) => {
    return <MaterialIcons name={'info'} size={25} color={tintColor} />;
};
summaryIcon.propTypes = {
    tintColor: PropTypes.string.isRequired
}
SummaryNavigator.navigationOptions = {
    title: 'Favourites',
    tabBarIcon: summaryIcon
};

const mainIcon = ({ tintColor }) => {
    return <MaterialIcons name={'home'} size={25} color={tintColor} />;
};
mainIcon.propTypes = {
    tintColor: PropTypes.string.isRequired
}
MainNavigator.navigationOptions = {
    title: 'Main',
    tabBarIcon: mainIcon
};

const favouritesIcon = ({ tintColor }) => {
    return <MaterialIcons name={'favorite'} size={25} color={tintColor} />;
};
favouritesIcon.propTypes = {
    tintColor: PropTypes.string.isRequired
}
FavouritesNavigator.navigationOptions = {
    title: 'Favourites',
    tabBarIcon: favouritesIcon
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