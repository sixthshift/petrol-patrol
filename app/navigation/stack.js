import { createStackNavigator } from 'react-navigation';

import MapScreen from '../components/map/map';
import FueltypeScreen from '../components/fueltype/fueltype';

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