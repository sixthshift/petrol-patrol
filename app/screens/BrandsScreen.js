import React from 'react';
import {FlatList} from 'react-native';

import List from '../components/List';
import ListItem from '../components/ListItem';

export default class BrandsScreen extends React.Component {
    
    render() {
        return (
            <FlatList>
                <ListItem text={'7-Eleven'} />
                <ListItem text={'BP'} />
                <ListItem text={'Budget'} />
                <ListItem text={'Caltex'} />
                <ListItem text={'Caltex Woolworths'} />
                <ListItem text={'Coles Express'} />
                <ListItem text={'Costco'} />
                <ListItem text={'Enhance'} />
                <ListItem text={'Independent'} />
                <ListItem text={'Inland Petroleum'} />
                <ListItem text={'Liberty'} />
                <ListItem text={'Lowes'} />
                <ListItem text={'Matilda'} />
                <ListItem text={'Metro Fuel'} />
                <ListItem text={'Mobil'} />
                <ListItem text={'Prime Petroleum'} />
                <ListItem text={'Puma Energy'} />
                <ListItem text={'Shell'} />
                <ListItem text={'Speedway'} />
                <ListItem text={'Tesla'} />
                <ListItem text={'United'} />
                <ListItem text={'Westside'} />
            </FlatList>
        );
    }
}