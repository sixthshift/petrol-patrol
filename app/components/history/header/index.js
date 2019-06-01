import { Header as NBHeader, Left, Right } from 'native-base';
import React from 'react';
import { View } from 'react-native';

import { ReportButton } from './buttons';
import { BackButton } from '../../header/buttons'

class Header extends React.Component {

    render() {
        return (
            <View>
                <NBHeader>
                    <Left>
                        <BackButton />
                    </Left>
                    <Right>
                        <ReportButton {...this.props} />
                    </Right>
                </NBHeader>
            </View>
        );
    }
}

export default Header;