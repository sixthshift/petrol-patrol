import { Body, ListItem, Text } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';

import { selectFueltype } from '../../actions/ui';

class FueltypeListItem extends React.Component {
    render() {
        const selected = this.props.listItem.code == this.props.selectedItem;
        const onPress = () => {
            this.props.selectFueltype(this.props.listItem.code);
        };
        return (
            <ListItem
                onPress={onPress}
                selected={selected}
            >
                <Body>
                    <Text>{this.props.listItem.code}</Text>
                    <Text note>{this.props.listItem.name}</Text>
                </Body>
            </ListItem>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        selectedItem: state.ui.fueltype
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectFueltype: (fueltype) => {
            dispatch(selectFueltype(fueltype));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FueltypeListItem);