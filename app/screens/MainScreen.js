import React from 'react';
import { Text, View } from 'react-native';

import Styles from '../styles/Styles'

export default class MainScreen extends React.Component {
    render() {
        return (
            <View style={Styles.container}>
                <Text>Main Screen</Text>
            </View>
        );
    }
}
