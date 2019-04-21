import React from 'react';
import { createDrawerNavigator } from 'react-navigation';

import PrivacyScreen from '../components/screens/privacy';
import StatisticsScreen from '../components/statistics';
import Sidebar from '../components/sidebar';

const renderSidebar = (props) => {
    return <Sidebar
        {...props}
    />
};

export default createDrawerNavigator(
    {
        privacy: {
            screen: PrivacyScreen
        },
        statistics: {
            screen: StatisticsScreen
        },
    },
    {
        initialRouteName: 'statistics',
        contentComponent: renderSidebar,
    }
);