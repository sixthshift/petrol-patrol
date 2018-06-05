import { Entypo, MaterialIcons } from '@expo/vector-icons';
import React from 'React';
import { View } from 'react-native';
import { ToolbarAction } from 'react-native-paper';
import { withNavigation } from 'react-navigation';

import Styles from '../styles/Styles';

const fuelIcon = <Entypo name={"drop"} size={24} />
const brandIcon = <MaterialIcons name={"local-gas-station"} size={24} />

class Header extends React.Component {
    render() {
        return (
            <View style={Styles.header} >
                <ToolbarAction
                    icon={brandIcon}
                    onPress={() => { this.props.navigation.navigate('Brands') }}
                />
                <ToolbarAction
                    icon={fuelIcon}
                    onPress={() => { this.props.navigation.navigate('Fuel') }}
                />
            </ View>
        );
    }
}

export default withNavigation(Header);