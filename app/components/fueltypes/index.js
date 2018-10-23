import { Container, Content, List as NBList } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';

import Header from '../header';
import Item from './item';
import { getFueltypes } from '../../selectors';
import styles from '../../styles/styles';
import { isActive } from '../utils';

class List extends React.Component {

    render() {
        const activeList = this.props.list.filter(isActive);
        return (
            <Container>
                <Header
                    showBack={true}
                    showSearch={false}
                />
                <Content style={styles.container}>
                    <NBList>
                        {activeList.map((item) => (<Item key={item.code} item={item} />))}
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