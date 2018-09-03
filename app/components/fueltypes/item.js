import { Body, ListItem, Text } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';

import { selectFueltypeAction } from '../../actions/ui';

class Item extends React.Component {
    render() {
        const selected = this.props.item.code == this.props.selected;
        const onPress = () => {
            this.props.select(this.props.item.code);
        };
        return (
            <ListItem
                onPress={onPress}
                selected={selected}
            >
                <Body>
                    <Text>{this.props.item.code}</Text>
                    <Text note>{this.props.item.name}</Text>
                </Body>
            </ListItem>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        selected: state.ui.fueltype
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        select: (fueltype) => {
            dispatch(selectFueltypeAction(fueltype));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);