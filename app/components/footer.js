import { Button, Footer as NBFooter, FooterTab, Icon } from 'native-base';
import React from 'react';
import { withNavigation } from 'react-navigation';

const MapsButton = () => {
    return (
        <Button>
            <Icon type='MaterialIcons' name='map' />
        </Button>
    );
}

const FavouritesButton = () => {
    return (
        <Button>
            <Icon type='MaterialIcons' name='favorite' />
        </Button>
    );
}

class Footer extends React.Component {

    render() {
        return (
            <NBFooter>
                <FooterTab>
                    <MapsButton/>
                    <FavouritesButton/>
                </FooterTab>
            </NBFooter>
        );
    }
}

export default withNavigation(Footer);