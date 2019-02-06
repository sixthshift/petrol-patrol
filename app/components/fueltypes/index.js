import { filter, isEqual, map } from 'lodash';
import { Container, Content, List as NBList } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';

import Header from '../header';
import Item from './item';
import { getFueltypes } from '../../selectors';
import styles from '../../styles/styles';
import { isActive } from '../../utils';

class List extends React.Component {

    renderItem(item) {
        return (
            <Item key={item.code} item={item} />
        );
    }

    shouldComponentUpdate(nextProps) {
        return !isEqual(this.props, nextProps);
    }

    render() {
        const activeList = filter(this.props.list, isActive);
        return (
            <Container>
                <Header
                    showBack={true}
                    showSearch={false}
                />
                <Content style={styles.container}>
                    <NBList>
                        {map(activeList, this.renderItem)}
                    </NBList>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        list: getFueltypes(state)
    };
};

export default connect(mapStateToProps)(List);