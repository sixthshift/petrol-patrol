import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colours from '../constants/Colours'

export default class MainScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Open up App.js to start working on your app!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colours.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
