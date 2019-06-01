import { Header as NBHeader, Left, Right } from 'native-base';
import React from 'react';

import { BackButton } from '../header/buttons';

class Header extends React.Component {

    render() {
        return (
            <NBHeader>
                <Left>
                    <BackButton />
                </Left>
                <Right />
            </NBHeader>
        );
    }
}

export default Header;