import { Button } from 'native-base';
import React from 'react';

import { Price } from '../../../../assets/icons';

const SortPriceButton = (props) => {
    return (
        <Button transparent onPress={props.content.sortPrice}>
            <Price />
        </Button>
    );
};

export default SortPriceButton;