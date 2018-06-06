import React from 'React';
import { View } from 'react-native';
import { ToolbarAction } from 'react-native-paper';
import { withNavigation } from 'react-navigation';

import Styles from '../styles/Styles';
import { BrandsIcon, FuelIcon } from '../constants/Icons';

class Header extends React.Component {
    render() {
        return (
            <View style={Styles.header} >
                <ToolbarAction
                    icon={BrandsIcon({})}
                    onPress={() => { this.props.navigation.navigate('Brands') }}
                />
                <ToolbarAction
                    icon={FuelIcon({})}
                    onPress={() => { this.props.navigation.navigate('Fuel') }}
                />
            </ View>
        );
    }
}

export default withNavigation(Header);