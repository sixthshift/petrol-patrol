import { Location, MapView, Permissions } from 'expo';
import React from 'React';
import { ToastAndroid } from 'react-native';

import Map from '../constants/Map'
import Strings from '../constants/Strings';
import Styles from '../styles/Styles'

export default class MapScreen extends React.Component {

    state = {
        region: Map.initialRegion,
    }

    componentDidMount() {
        this._getLocationAsync();
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === 'granted') {
            let location = await Location.getCurrentPositionAsync({});
            this.setState({ region: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 } });
        } else {
            ToastAndroid.show(Strings.noLocationPermissions, ToastAndroid.LONG);
        }
    };

    _onRegionChangeComplete = (region) => {
        this.setState({ region: region });
    };

    render() {
        return (
            <MapView
                loadingEnabled={true}
                onRegionChangeComplete={this._onRegionChangeComplete}
                pitchEnabled={false}
                region={this.state.region}
                showsBuildings={false}
                showsTraffic={true}
                showsMyLocationButton={true}
                showsUserLocation={true}
                style={Styles.map}
            />
        )
    }
}