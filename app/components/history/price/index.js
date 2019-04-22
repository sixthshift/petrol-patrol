import React from 'react';
import { FlatList } from 'react-native';

import Item from './item';

class PriceList extends React.Component {

    renderItem(item) {
        return (<Item item={item.item} />);
    }

    render() {
        return (
            <FlatList
                data={this.props.list}
                inverted
                keyExtractor={(item) => { return item.timestamp.toString(); }}
                renderItem={this.renderItem}
            />
        );
    }
}

export default PriceList;