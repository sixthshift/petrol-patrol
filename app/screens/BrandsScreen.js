import React from 'react';

import List from '../components/List';
import ListItem from '../components/ListItem';

export default class BrandsScreen extends React.Component {
    render() {
        return (
            <List>
                <ListItem text={'7-Eleven'} />
                <ListItem text={'BP'} />
                <ListItem text={'Caltex'} />
                <ListItem text={'Shell'} />
            </List>
        );
    }
}