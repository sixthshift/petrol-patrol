import { has } from 'lodash';
import { Content, List } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';

import FueltypeListItem from '../components/fueltypeListItem';
import Header from '../components/header';
import styles from '../styles/styles';

class Fueltype extends React.Component {
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

    static isActive(item) {
        return has(item, 'active') && item.active;
    }

    render() {
        const activeList = this.props.list.filter(Fueltype.isActive);
        return (
            <Content style={styles.container}>
                <List>
                    {activeList.map((listItem) => (<FueltypeListItem key={listItem.code} listItem={listItem} />))}
                </List>
            </Content>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.db.fueltypes
    };
};

export default connect(mapStateToProps)(Fueltype);