import { Button } from 'native-base';
import React from 'react';

import { Distance } from '../../../../assets/icons';

const SortDistanceButton = (props) => {
    return (
        <Button transparent onPress={props.content.sortDistance}>
            <Distance />
        </Button>
    );
};

export default SortDistanceButton;