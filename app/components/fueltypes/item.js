import { isEqual } from 'lodash';
import { Body, ListItem, Text } from 'native-base';
import React from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import { selectFueltypeAction } from '../../actions';
import { isFueltypeSelected } from '../../selectors';

class Item extends React.Component {

    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
    }

    onPress() {
        this.props.select(this.props.item.code);
        this.props.navigation.goBack();
    }

    shouldComponentUpdate(nextProps) {
        return !isEqual(this.props, nextProps);
    }

    render() {
        return (
            <ListItem
                onPress={this.onPress}
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
            dispatch(selectFueltypeAction(fueltype));
        }
    };
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Item));