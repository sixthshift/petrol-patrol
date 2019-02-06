import { size } from 'lodash';
import React from 'react';
import { FlatList as RNFlatList } from 'react-native';

import Item from './item';

const itemHeight = 75;

class FlatList extends React.Component {

    constructor(props) {
        super(props);
        this.keyExtractor = this.keyExtractor.bind(this);
    }

    getItemLayout(data, index) {
        return {
            length: itemHeight,
            offset: itemHeight * index,
            index: index,
        };
    }

    keyExtractor(item) {
        return item.id.toString();
    }

    renderItem(item) {
        return (
            <Item
                station={item.item}
            />
        );
    }

    render() {
        return (
            <RNFlatList
                data={this.props.data}
                getItemLayout={this.getItemLayout}
                initialNumToRender={size(this.props.data)}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
            />
        );
    }
}

export default FlatList;