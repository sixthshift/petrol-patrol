import { includes } from 'lodash';
import { Body, ListItem, Text, CheckBox } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';
import { selectBrandsAction } from '../../actions/ui';

class Item extends React.Component {
    render() {
        const checked = includes(this.props.checked, this.props.item.name);
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
                    checked={checked}
                    onPress={onPress}
                />
            </ListItem>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        checked: state.ui.brands
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