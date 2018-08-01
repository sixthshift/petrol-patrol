import React from 'react';
import { View } from 'react-native';

import Styles from './styles/styles';
import MapScreen from './screens/map';

export default class App extends React.Component {
    render() {
        return (
            <View style={Styles.root}>
                <MapScreen />
            </View>
        );
    }
}