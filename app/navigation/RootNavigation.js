import React from 'React'
import { View } from 'react-native'
import AppNavigator from './AppNavigator'
import Styles from '../styles/Styles'

export default class RootNavigation extends React.Component {
    render() {
        return (
            <View style={Styles.rootContainerStyle}>
                <AppNavigator />
            </View >
        )
    }
}