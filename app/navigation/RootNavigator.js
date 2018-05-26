import React from 'React';
import { View } from 'react-native';
import TabNavigator from './TabNavigator';
import Styles from '../styles/Styles';

export default class RootNavigator extends React.Component {
    render() {
        return (
            <View style={Styles.rootContainerStyle}>
                <TabNavigator />
            </View >
        )
    }
}