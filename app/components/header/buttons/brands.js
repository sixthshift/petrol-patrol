import { Button, Icon } from 'native-base';
import React from 'react';
import { withNavigation } from 'react-navigation'

const BrandsButton = (props) => {
    return (
        <Button transparent onPress={() => { props.navigation.navigate('brands') }}>
            <Icon type='MaterialIcons' name='local-gas-station' />
        </Button>
    );
}

export default withNavigation(BrandsButton);