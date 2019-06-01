import { Header as NBHeader, Left, Right } from 'native-base';
import React from 'react';

import { FavouritesButton } from './buttons';
import { BackButton } from '../../header/buttons';

class Header extends React.Component {

    render() {
        return (
            <NBHeader>
                <Left>
                    <BackButton />
                </Left>
                <Right>
                    <FavouritesButton {...this.props} />
                </Right>
            </NBHeader>
        );
    }
}

export default Header;