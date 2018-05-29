import React from 'react';
import { View } from 'react-native';
import { FAB } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import Colours from '../constants/Colours';
import Strings from '../constants/Strings';
import Styles from '../styles/Styles';

const buttonIcon = <MaterialIcons name={'map'} size={25} color={Colours.primary} />;

export default class MainScreen extends React.Component {
    render() {
        return (
            <View style={Styles.container}>
                <FAB
                    label={Strings.button}
                    color={Colours.primary}
                    style={Styles.button}
                    icon={buttonIcon}
                    onPress={() => { this.props.navigation.navigate('Map') }}
                />
            </View>
        );
    }
}
