import { createStackNavigator } from 'react-navigation';

import BrandsScreen from '../components/brands';
import FavouritesScreen from '../components/favourites';
import DetailsScreen from '../components/details';
import FueltypesScreen from '../components/fueltypes';
import MapsScreen from '../components/maps';

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
        maps: {
            screen: MapsScreen
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