import { Body, ListItem, Text } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';

import { selectFueltypeAction } from '../../actions';
import { isFueltypeSelected } from '../../selectors';

class Item extends React.Component {
    render() {
        const onPress = () => {
            this.props.select(this.props.item.code);
        };
        return (
            <ListItem
                onPress={onPress}
                selected={this.props.selected}
            >
                <Body>
                    <Text>{this.props.item.code}</Text>
                    <Text note>{this.props.item.name}</Text>
                </Body>
            </ListItem>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        selected: isFueltypeSelected(state, ownProps)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        select: (fueltype) => {
            dispatch(selectFueltypeAction(fueltype))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);