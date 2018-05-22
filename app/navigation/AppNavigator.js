import { createMaterialTopTabNavigator } from 'react-navigation'

import FavouritesScreen from '../screens/FavouritesScreen';
import TrendsScreen from '../screens/TrendsScreen'
import Styles from '../styles/Styles'

export default createMaterialTopTabNavigator(
    {
        Trends: { screen: TrendsScreen },
        Favourites: { screen: FavouritesScreen }
    },
    {
        tabBarOptions: {
            style: Styles.tabBarStyle,
            indicatorStyle: Styles.tabBarIndicatorStyle,
        }
    }
);