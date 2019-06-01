import { Header as NBHeader, Right } from 'native-base';
import React from 'react';
import { View } from 'react-native';

import { ListButton } from './buttons';
import { BrandsButton, FueltypesButton } from '../../header/buttons';
import Search from '../../header/search';

class Header extends React.Component {

    render() {
        return (
            <View>
                <NBHeader>
                    <Right>
                        <FueltypesButton />
                        <BrandsButton {...this.props} />
                        <ListButton {...this.props} />
                    </Right>
                </NBHeader>
                <Search {...this.props} />
            </View>
        );
    }
}

export default Header;