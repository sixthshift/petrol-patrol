import { Body, ListItem, Text, CheckBox } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';
import { selectBrandsAction } from '../../actions';
import { isBrandSelected } from '../../selectors/ui';

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