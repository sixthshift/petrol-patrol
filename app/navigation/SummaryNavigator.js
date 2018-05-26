import { createStackNavigator } from 'react-navigation';

import SummaryScreen from '../screens/SummaryScreen';

const SummaryNavigator = createStackNavigator(
    {
        Summary: { screen: SummaryScreen }
    }
);

SummaryNavigator.navigationOptions = {
    tabBarLabel: 'Summary'
};

export default SummaryNavigator;