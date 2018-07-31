import { assign } from 'lodash';
import { Location, MapView, Permissions } from 'expo';
import React from 'react';

import Strings from '../constants/strings';
import Styles from '../styles/styles';

export default class Map extends React.Component {

    constructor() {
        super();
        this.state = {
            viewport: {
                latitude: -33.8688,
                longitude: 151.2093,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            }
        };
    }

    componentDidMount() {
        this._getLocationAsync();
    }

    _getLocationAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === 'granted') {
            const location = await Location.getCurrentPositionAsync({});
            const viewport = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            };
            const state = assign({}, this.state, viewport);
            this.setState(state);
        } else {
            ToastAndroid.show(Strings.noLocationPermissions, ToastAndroid.LONG);
        }
    };

    updateViewport = (viewport) => {
        const state = assign({}, this.state, viewport);
        this.setState(state);
    };

    render() {
        return (
            <MapView
                loadingEnabled={true}
                onRegionChangeComplete={this.updateViewport}
                pitchEnabled={false}
                region={this.state.viewport}
                showsBuildings={false}
                showsTraffic={true}
                showsMyLocationButton={true}
                showsUserLocation={true}
                style={Styles.map}
            />
        )
    }

}