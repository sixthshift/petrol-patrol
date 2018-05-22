import { createMaterialTopTabNavigator } from 'react-navigation'
import MainScreen from '../screens/MainScreen'
import Styles from '../styles/Styles'

export default createMaterialTopTabNavigator(
    {
        Main: MainScreen,
    },
    {
        tabBarOptions: {
            style: Styles.tabBarStyle,
            indicatorStyle: Styles.tabBarIndicatorStyle,
        }
    }
);