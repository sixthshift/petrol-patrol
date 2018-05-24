import React from 'react';
import { Text, View } from 'react-native';

import Styles from '../styles/Styles'

export default class SummaryScreen extends React.Component {
    render() {
        return (
            <View style={Styles.container}>
                <Text>Summary Screen</Text>
            </View>
        );
    }
}
