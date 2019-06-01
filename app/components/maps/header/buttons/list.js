import { Button, Icon } from 'native-base';
import React from 'react';
import { withNavigation } from 'react-navigation';

const ListButton = (props) => {
    return (
        <Button transparent onPress={() => { props.navigation.navigate('list') }}>
            <Icon type="MaterialIcons" name="view-list" />
        </Button>
    );
};

export default withNavigation(ListButton);