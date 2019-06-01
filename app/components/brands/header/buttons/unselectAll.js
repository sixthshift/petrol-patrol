import { Button, Icon } from 'native-base';
import React from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import { selectNoneBrandsAction } from '../../../../actions';

class UnselectAllButton extends React.Component {

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <Button transparent onPress={() => { this.props.unselectAll() }}>
                <Icon type="MaterialCommunityIcons" name="select" />
            </Button>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        unselectAll: () => {
            dispatch(selectNoneBrandsAction())
        }
    };
};

export default withNavigation(connect(null, mapDispatchToProps)(UnselectAllButton));