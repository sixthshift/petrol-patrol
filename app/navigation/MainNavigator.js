import { createStackNavigator } from 'react-navigation';

import MainScreen from '../screens/MainScreen';
import MapScreen from '../screens/MapScreen';

const MainNavigator = createStackNavigator(
    {
        Main: { screen: MainScreen },
        Map: { screen: MapScreen },
    }
);

export default MainNavigator;