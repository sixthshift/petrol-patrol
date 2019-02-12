import { Location, Permissions } from 'expo';
import { isEmpty, isEqual, omit } from 'lodash';
import { Body, Container, Content, Icon, Text } from 'native-base';
import React from 'react';
import { ToastAndroid, View } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import { reorderFavouritesAction, setLocationAction, setRegionAction } from '../../actions';
import Colour from '../../constants/colours';
import FlatList from '../flatlist';
import Footer from '../footer';
import Header from '../header';
import { getFavouriteStations } from '../../selectors';
import { noLocationPermissions, emptyFavourites } from '../strings';
import { encompassingRegion } from '../../utils';

const EmptyState = () => {
    return (
        <View style={{
            alignItems: "center"
        }}>
            <Icon
                name="heart-broken"
                style={{
                    color: Colour.primaryLight,
                    fontSize: 200,
                }}
                type="MaterialCommunityIcons"
            />
            <Text style={{
                color: Colour.primaryLight
            }}>
                {emptyFavourites}
            </Text>
        </View>
    );
};

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

    shouldComponentUpdate(nextProps) {
        const before = omit(this.props, ['prices']);
        const after = omit(nextProps, ['prices']);
        return !isEqual(before, after);
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
                    {isEmpty(this.props.favourites) ? (
                        <Body>
                            <EmptyState />
                        </Body>
                    ) : (
                            <FlatList
                                data={this.props.favourites}
                            />
                        )
                    }
                </Content>
                <Footer />
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const favourites = getFavouriteStations(state);
    return {
        favourites: favourites,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        reorder: (favourites) => {
            dispatch(reorderFavouritesAction(favourites));
        },
        setLocation: (location) => {
            dispatch(setLocationAction(location));
        },
        setRegion: (region) => {
            dispatch(setRegionAction(region));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);