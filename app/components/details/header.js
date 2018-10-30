import { includes } from 'lodash';
import { Button, Header as NBHeader, Icon, Left, Right } from 'native-base';
import React from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { selectFavouritesAction } from '../../actions';

const BackButton = (props) => {
    return (
        <Button transparent onPress={() => { props.navigation.goBack() }}>
            <Icon name='arrow-back' />
        </Button>
    );
}

const FavouritesButton = (props) => {
    const selected = props.selected;
    if (selected) {
        return (
            <Button transparent onPress={() => { props.select(props.station.id) }}>
                <Icon type='MaterialIcons' name='favorite' />
            </Button>
        );
    } else {
        return (
            <Button transparent onPress={() => { props.select(props.station.id) }}>
                <Icon type='MaterialIcons' name='favorite-border' />
            </Button>
        );
    }
};

class Header extends React.Component {

    render() {
        return (
            <NBHeader>
                <Left>
                    <BackButton {...this.props} />
                </Left>
                <Right>
                    <FavouritesButton {...this.props} />
                </Right>
            </NBHeader>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        selected: includes(state.ui.favourites, ownProps.station.id),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        select: (stationID) => {
            dispatch(selectFavouritesAction(stationID));
        }
    };
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Header));