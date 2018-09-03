import { filter, has, map } from 'lodash';
import { Content, List as NBList } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';

import Header from '../header';
import Item from './item';
import styles from '../../styles/styles';
import { isActive } from '../util';

class List extends React.Component {
    static navigationOptions({ navigation }) {
        return {
            header: (
                <Header
                    navigation={navigation}
                    showBack={true}
                    showSearch={false}
                />
            )
        };
    }

    render() {
        const activeList = filter(this.props.list, isActive);
        renderItem = (item) => (
            <Item key={item.name} item={item} />
        );
        return (
            <Content style={styles.container}>
                <NBList>
                    {map(activeList, renderItem)}
                </NBList>
            </Content>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.db.brands
    };
};

export default connect(mapStateToProps)(List);