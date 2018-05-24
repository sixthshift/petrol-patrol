import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation';

import FavouritesScreen from '../screens/FavouritesScreen';
import MainScreen from '../screens/MainScreen';
import SummaryScreen from '../screens/SummaryScreen';
import Styles from '../styles/Styles';

const summaryStack = createStackNavigator({
    Summary: { screen: SummaryScreen }
});

summaryStack.navigationOptions = {
    tabBarLabel: 'Summary',
};

const mainStack = createStackNavigator({
    Main: { screen: MainScreen }
});

mainStack.navigationOptions = {
    tabBarLabel: 'Main',
};

const favouritesStack = createStackNavigator({
    Favourites: { screen: FavouritesScreen }
});

favouritesStack.navigationOptions = {
    tabBarLabel: 'Favourites',
};



export default createMaterialBottomTabNavigator(
    {
        summaryStack,
        mainStack,
        favouritesStack,
    },
    {
        initialRouteName: 'mainStack'
    }
);