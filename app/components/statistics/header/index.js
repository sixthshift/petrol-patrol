import { Header as NBHeader, Left, Right } from 'native-base';
import React from 'react';
import { View } from 'react-native';

import { DrawerButton } from './buttons';
import { FueltypesButton } from '../../header/buttons';
import Search from '../../header/search';

class Header extends React.Component {

    render() {
        return (
            <View>
                <NBHeader>
                    <Left>
                        <DrawerButton />
                    </Left>
                    <Right>
                        <FueltypesButton />
                    </Right>
                </NBHeader>
                <Search {...this.props} />
            </View>
        );
    }
}

export default Header;