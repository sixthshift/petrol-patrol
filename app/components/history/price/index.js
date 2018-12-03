import { isEmpty, isUndefined, last } from 'lodash';
import moment from 'moment';
import React from 'react';
import { FlatList } from 'react-native';

import Item from './item';

class PriceList extends React.Component {

    renderItem(item) {
        return (<Item item={item.item} />);
    }

    render() {
        let nowPrice = undefined;
        if (!isEmpty(this.props.list)) {
            nowPrice = { ...last(this.props.list) };
            nowPrice.timestamp = moment().unix();
        }
        const list = isUndefined(nowPrice) ? this.props.list : [...this.props.list, nowPrice];
        return (
            <FlatList
                data={list}
                inverted
                keyExtractor={(item) => { return item.timestamp.toString(); }}
                renderItem={this.renderItem}
            />
        );
    }
}

export default PriceList;