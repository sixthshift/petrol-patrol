import { isEqual } from 'lodash';
import { Body, ListItem, Text, CheckBox } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';
import { selectBrandsAction } from '../../actions';
import { isBrandSelected } from '../../selectors';

class Item extends React.Component {

    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
    }

    onPress() {
        this.props.select(this.props.item.name);
    }

    shouldComponentUpdate(nextProps) {
        return !isEqual(this.props, nextProps);
    }

    render() {
        return (
            <ListItem
                onPress={this.onPress}
            >
                <Body>
                    <Text>{this.props.item.name}</Text>
                </Body>
                <CheckBox
                    checked={this.props.checked}
                    onPress={this.onPress}
                />
            </ListItem>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        checked: isBrandSelected(state, ownProps)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        select: (brand) => {
            dispatch(selectBrandsAction(brand));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);