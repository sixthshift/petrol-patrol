import { createStackNavigator } from 'react-navigation';

import MainScreen from '../screens/MainScreen';

const MainNavigator = createStackNavigator(
    {
        Main: { screen: MainScreen }
    }
);

export default MainNavigator;