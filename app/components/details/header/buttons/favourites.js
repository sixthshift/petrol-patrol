import { Button, Icon } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';

import { selectFavouritesAction } from '../../../../actions';
import { isStationFavourited } from '../../../../selectors';

class FavouritesButton extends React.Component {

    render() {
        const selected = this.props.selected;
        if (selected) {
            return (
                <Button transparent onPress={() => { this.props.select(this.props.station.id) }}>
                    <Icon type='MaterialIcons' name='favorite' />
                </Button>
            );
        } else {
            return (
                <Button transparent onPress={() => { this.props.select(this.props.station.id) }}>
                    <Icon type='MaterialIcons' name='favorite-border' />
                </Button>
            );
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        selected: isStationFavourited(state, ownProps),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        select: (stationID) => {
            dispatch(selectFavouritesAction(stationID));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavouritesButton);