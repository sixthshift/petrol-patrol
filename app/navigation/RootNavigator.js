import React from 'React';
import { View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import TabNavigator from './TabNavigator';
import Styles from '../styles/Styles';

export default class RootNavigator extends React.Component {
    render() {
        return (
            <PaperProvider>
                <View style={Styles.rootContainerStyle}>
                    <TabNavigator />
                </View >
            </PaperProvider>
        )
    }
}