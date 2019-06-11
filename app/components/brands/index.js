import { filter, isEqual, map } from 'lodash';
import { Container, Content } from 'native-base';
import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';

import Header from './header';
import Item from './item';
import { getBrands } from '../../selectors';
import styles from '../../styles/styles';
import { isActive } from '../../utils';

class List extends React.Component {

    keyExtractor(item) {
        return item.name.toString();
    }

    renderItem(item) {
        return (
            <Item item={item.item} />
        );
    }

    shouldComponentUpdate(nextProps) {
        return !isEqual(this.props, nextProps);
    }

    render() {
        const activeList = filter(this.props.list, isActive);
        return (
            <Container>
                <Header />
                <Content style={styles.container}>
                    <FlatList
                        data={activeList}
                        initialNumToRender={activeList.length}
                        keyExtractor={this.keyExtractor}
                        renderItem={this.renderItem}
                    >
                    </FlatList>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        list: getBrands(state)
    };
};

export default connect(mapStateToProps)(List);