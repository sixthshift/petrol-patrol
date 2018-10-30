import React from 'react';
import { FlatList } from 'react-native';

import Item from './item';

class List extends React.Component {

    renderItem(item) {
        return (
            <Item station={item.item} />
        );
    }

    render() {
        return (
            <FlatList
                data={this.props.data}
                keyExtractor={(item) => { return item.id.toString(); }}
                renderItem={this.renderItem}
            />
        );
    }
}

export default List;