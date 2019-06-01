import { Button, Icon } from 'native-base';
import React from 'react';
import { withNavigation } from 'react-navigation';

const DrawerButton = (props) => {
    return (
        <Button transparent onPress={() => { props.navigation.toggleDrawer() }}>
            <Icon type='MaterialIcons' name='menu' />
        </Button>
    );
};

export default withNavigation(DrawerButton);