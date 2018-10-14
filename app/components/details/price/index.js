import { filter } from 'lodash';
import { List } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';

import Item from './item';
import { isActive } from '../../utils';
import styles from '../styles';

class PriceList extends React.Component {

    render() {
        const activeList = filter(this.props.list, isActive);
        return (
            <List style={styles.list}>
                {activeList.map((item) => (<Item item={item} key={item.code} station={this.props.station} />))}
            </List>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.db.fueltypes,
    };
};

export default connect(mapStateToProps)(PriceList);