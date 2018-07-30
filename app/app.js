import React from 'react';
import { Text, View } from 'react-native';

import Styles from './styles/Styles';

export default class App extends React.Component {
    render() {
        return (
            <View style={Styles.root}>
                <Text>Hello World!</Text>
            </View>
        );
    }
}