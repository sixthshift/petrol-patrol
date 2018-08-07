import React from 'react';
import { View } from 'react-native';
import StackNavigator from './navigation/stack';
import Styles from './styles/styles';

export default class App extends React.Component {
    render() {
        return (
            <View style={Styles.root}>
                <StackNavigator />
            </View>
        );
    }
}