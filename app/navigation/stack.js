import { createStackNavigator } from 'react-navigation';

import BrandsScreen from '../components/brands';
import FavouritesScreen from '../components/favourites';
import DetailsScreen from '../components/details';
import FueltypesScreen from '../components/fueltypes';
import HistoryScreen from '../components/history';
import ListScreen from '../components/list';
import MapsScreen from '../components/maps';
import StatisticsNavigator from './statisticsDrawer';

export default createStackNavigator(
    {
        brands: {
            screen: BrandsScreen
        },
        details: {
            screen: DetailsScreen
        },
        favourites: {
            screen: FavouritesScreen
        },
        fueltypes: {
            screen: FueltypesScreen
        },
        history: {
            screen: HistoryScreen
        },
        list: {
            screen: ListScreen
        },
        maps: {
            screen: MapsScreen
        },
        statistics: {
            screen: StatisticsNavigator
        },
    },
    {
        initialRouteName: 'maps',
        initialRouteParams: {
            getLocation: true
        },
        headerMode: 'none',
    }
);