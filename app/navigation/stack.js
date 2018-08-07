import { createStackNavigator } from 'react-navigation';

import MapScreen from '../screens/map';
import FueltypeScreen from '../screens/fueltype';

export default createStackNavigator(
    {
        map: {
            screen: MapScreen,
        },
        fueltype: {
            screen: FueltypeScreen
        }
    },
    {
        initialRouteName: 'map'
    }
);