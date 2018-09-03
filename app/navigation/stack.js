import { createStackNavigator } from 'react-navigation';

import BrandsScreen from '../components/brands'
import MapsScreen from '../components/maps';
import FueltypesScreen from '../components/fueltypes';

export default createStackNavigator(
    {
        brands: {
            screen: BrandsScreen
        },
        maps: {
            screen: MapsScreen,
        },
        fueltypes: {
            screen: FueltypesScreen
        }
    },
    {
        initialRouteName: 'maps'
    }
);