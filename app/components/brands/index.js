import { filter, has, map } from 'lodash';
import { Container, Content, List as NBList } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';

import Header from '../header';
import Item from './item';
import styles from '../../styles/styles';
import { isActive } from '../utils';

class List extends React.Component {

    render() {
        const activeList = filter(this.props.list, isActive);
        renderItem = (item) => (
            <Item key={item.name} item={item} />
        );
        return (
            <Container>
                <Header
                    showBack={true}
                    showSearch={false}
                />
                <Content style={styles.container}>
                    <NBList>
                        {map(activeList, renderItem)}
                    </NBList>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.db.brands
    };
};

export default connect(mapStateToProps)(List);