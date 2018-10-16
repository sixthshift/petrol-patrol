import { includes } from 'lodash';
import { Body, ListItem, Text, CheckBox } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';
import { selectBrandsAction } from '../../actions';

class Item extends React.Component {
    render() {
        const onPress = () => {
            this.props.select(this.props.item.name);
        };
        return (
            <ListItem
                onPress={onPress}
            >
                <Body>
                    <Text>{this.props.item.name}</Text>
                </Body>
                <CheckBox
                    checked={this.props.checked}
                    onPress={onPress}
                />
            </ListItem>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        checked: includes(state.ui.brands, ownProps.item.name)
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