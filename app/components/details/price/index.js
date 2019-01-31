import { filter, isEqual } from 'lodash';
import { Container, Content, List } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';

import Item from './item';
import { getFueltypes } from '../../../selectors';
import { isActive } from '../../utils';
import styles from './styles';

class PriceList extends React.Component {

    shouldComponentUpdate(nextProps) {
        return !isEqual(this.props, nextProps);
    }

    render() {
        const activeList = filter(this.props.list, isActive);
        return (
            <Container>
                <Content>
                    <List style={styles.list}>
                        {activeList.map((item) => (<Item item={item} key={item.code} station={this.props.station} />))}
                    </List>
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