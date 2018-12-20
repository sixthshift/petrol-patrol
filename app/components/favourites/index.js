import { Location, Permissions } from 'expo';
import { Container, Content } from 'native-base';
import React from 'react';
import { ToastAndroid } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import { setLocationAction, setRegionAction } from '../../actions';
import Footer from '../footer';
import Header from '../header';
import List from '../list';
import { getFavourites } from '../../selectors/ui';
import { noLocationPermissions } from '../strings';
import { encompassingRegion } from '../utils';

class Favourites extends React.Component {

    componentDidMount() {
        this._getLocationAsync();
    }

    _getLocationAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === 'granted') {
            const location = await Location.getCurrentPositionAsync({});
            this.props.setLocation(location.coords);
        } else {
            ToastAndroid.show(noLocationPermissions, ToastAndroid.LONG);
        }
    };

    onSearch = (stations) => {
        this.props.setRegion(encompassingRegion(stations));
        const action = StackActions.reset({
            actions: [NavigationActions.navigate({ routeName: 'maps' })],
            index: 0,
            key: null,
        });
        this.props.navigation.dispatch(action);
    }

    render() {
        return (
            <Container>
                <Header
                    content={this}
                    showBack={false}
                    showBrands={false}
                    showFueltypes={true}
                    showSearch={true}
                />
                <Content>
                    <List
                        data={this.props.favourites}
                    />
                </Content>
                <Footer />
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        favourites: getFavourites(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLocation: (location) => {
            dispatch(setLocationAction(location));
        },
        setRegion: (region) => {
            dispatch(setRegionAction(region));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);