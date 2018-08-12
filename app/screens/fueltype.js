import { has } from 'lodash';
import { Body, Content, List, ListItem, Text } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/header';
import styles from '../styles/styles';

const FueltypeListItem = (props) => {
    return (
        <ListItem selected={props.selected}>
            <Body>
                <Text>{props.item.code}</Text>
                <Text note>{props.item.name}</Text>
            </Body>
        </ListItem>
    );
}

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

    renderItemWithSelectedHighlighting(selectedFueltype) {
        return (item) => {
            const selected = (item.code == selectedFueltype.code);
            return <FueltypeListItem item={item} key={item.code} selected={selected} />;
        };
    }

    render() {
        const selectedFueltype = this.props.ui.fueltype;
        const renderItem = this.renderItemWithSelectedHighlighting(selectedFueltype);
        const activeListItems = this.props.db.fueltypes
            .filter(Fueltype.isActive)
            .map(renderItem);
        return (
            <Content style={styles.container}>
                <List>
                    {activeListItems}
                </List>
            </Content>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        db: {
            fueltypes: state.db.fueltypes
        },
        ui: {
            fueltype: state.ui.fueltype
        }
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFueltypeClick: (fueltype) => {
            dispatch(setFueltype(fueltype));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Fueltype);