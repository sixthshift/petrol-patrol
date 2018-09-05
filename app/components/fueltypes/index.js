import { Content, List as NBList } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';

import Header from '../header';
import Item from './item';
import styles from '../../styles/styles';
import { isActive } from '../utils';

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
        const activeList = this.props.list.filter(isActive);
        return (
            <Content style={styles.container}>
                <NBList>
                    {activeList.map((item) => (<Item key={item.code} item={item} />))}
                </NBList>
            </Content>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.db.fueltypes
    };
};

export default connect(mapStateToProps)(List);