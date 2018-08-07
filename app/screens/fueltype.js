import React from 'react';
import { View } from 'react-native';

import Header from '../components/header';
import styles from '../styles/styles';

export default class Fueltype extends React.Component {

    static navigationOptions({ navigation }) {
        return {
            header: (
                <Header
                    navigation={navigation}
                    showBack={true}
                    showSearch={false}
                />
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
            </View>
        );
    }
}