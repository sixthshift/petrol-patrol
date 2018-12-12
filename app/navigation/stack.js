import { createStackNavigator } from 'react-navigation';

import BrandsScreen from '../components/brands';
import FavouritesScreen from '../components/favourites';
import DetailsScreen from '../components/details';
import FueltypesScreen from '../components/fueltypes';
import HistoryScreen from '../components/history';
import MapsScreen from '../components/maps';
import StatisticsScreen from '../components/statistics';

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
        maps: {
            screen: MapsScreen
        },
        statistics: {
            screen: StatisticsScreen
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