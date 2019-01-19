import React from 'react';
import { FlatList as RNFlatList } from 'react-native';

import Item from './item';

class FlatList extends React.Component {

    renderItem(item) {
        return (
            <Item station={item.item} />
        );
    }

    render() {
        return (
            <RNFlatList
                data={this.props.data}
                keyExtractor={(item) => { return item.id.toString(); }}
                renderItem={this.renderItem}
            />
        );
    }
}

export default FlatList;