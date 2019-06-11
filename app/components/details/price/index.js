import { filter, isEqual } from 'lodash';
import { Container, Content } from 'native-base';
import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';

import Item from './item';
import { getFueltypes } from '../../../selectors';
import { isActive } from '../../../utils';
import styles from './styles';

class PriceList extends React.Component {

    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        return !isEqual(this.props, nextProps);
    }

    keyExtractor(item) {
        return item.code;
    }

    renderItem(item) {
        return (
            <Item
                item={item.item}
                station={this.props.station} />
        );
    }

    render() {
        const activeList = filter(this.props.list, isActive);
        return (
            <Container>
                <Content>
                    <FlatList
                        data={activeList}
                        initialNumToRender={activeList.length}
                        keyExtractor={this.keyExtractor}
                        renderItem={this.renderItem}
                        style={styles.list}
                    />
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        list: getFueltypes(state),
    };
};

export default connect(mapStateToProps)(PriceList);