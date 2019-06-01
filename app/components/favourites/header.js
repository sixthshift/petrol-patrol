import { Header as NBHeader, Right } from 'native-base';
import React from 'react';
import { View } from 'react-native';

import { FueltypesButton } from '../header/buttons';
import Search from '../header/search';

class Header extends React.Component {

    render() {
        return (
            <View>
                <NBHeader>
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