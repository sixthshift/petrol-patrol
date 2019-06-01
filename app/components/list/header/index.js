import { Header as NBHeader, Left, Right } from 'native-base';
import React from 'react';
import { View } from 'react-native';

import { SortDistanceButton, SortPriceButton } from './buttons';
import { BackButton, BrandsButton, FueltypesButton } from '../../header/buttons';

class Header extends React.Component {

    render() {
        return (
            <View>
                <NBHeader>
                    <Left>
                        <BackButton />
                    </Left>
                    <Right>
                        <FueltypesButton />
                        <BrandsButton />
                        <SortDistanceButton {...this.props} />
                        <SortPriceButton {...this.props} />
                    </Right>
                </NBHeader>
            </View>
        );
    }
}

export default Header;