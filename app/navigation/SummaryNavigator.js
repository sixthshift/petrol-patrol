import React from 'React';
import { createStackNavigator } from 'react-navigation';

import Header from '../components/Header';

import SummaryScreen from '../screens/SummaryScreen';

SummaryScreen.navigationOptions = {
    header: <Header />,
    tabBarLabel: 'Summary',
};

const SummaryNavigator = createStackNavigator(
    {
        Summary: { screen: SummaryScreen }
    }
);

export default SummaryNavigator;