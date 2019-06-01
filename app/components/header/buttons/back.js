import { Button, Icon } from 'native-base';
import React from 'react';
import { withNavigation } from 'react-navigation';

const BackButton = (props) => {
    return (
        <Button transparent onPress={() => { props.navigation.goBack() }}>
            <Icon name='arrow-back' />
        </Button>
    );
}

export default withNavigation(BackButton);