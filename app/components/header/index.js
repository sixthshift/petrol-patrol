import { Header as NBHeader, Left, Right } from 'native-base';
import React from 'react';
import { View } from 'react-native';

import { BackButton } from './buttons';

class Header extends React.Component {

    render() {
        return (
            <View>
                <NBHeader>
                    <Left>
                        <BackButton />
                    </Left>
                    <Right />
                </NBHeader>
            </View>
        );
    }
}


export default Header;
