import { Location, MapView, Permissions } from 'expo';
import React from 'react';
import { connect } from 'react-redux';

import { defaultRegion } from './constants';
import firedb from '../../api/firebase';
import Header from '../header';
import Marker from './marker';
import { noLocationPermissions } from './strings';
import styles from './styles';

class Map extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            region: defaultRegion,
            stations: [],
        };
        this.geoQuery = firedb.createGeoQuery(this.state.region);
    }

    componentDidMount() {
        this._getLocationAsync();
        this.geoQuery.on('key_entered', (key, location, distance) => {
            console.log(key + ' ' + location + ' ' + distance);
        });
        firedb.updateGeoQuery(this.geoQuery, this.state.region);
    }

    componentWillUnmount() {
        this.geoQuery.cancel();
    }

    _getLocationAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === 'granted') {
            const location = await Location.getCurrentPositionAsync({});
            const region = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: this.state.region.latitudeDelta,
                longitudeDelta: this.state.region.longitudeDelta,
            };
            this._onRegionChange(region);
        } else {
            ToastAndroid.show(noLocationPermissions, ToastAndroid.LONG);
        }
    };

    _onRegionChange = (region) => {
        this.setState({ ...this.state, region });
        firedb.updateGeoQuery(this.geoQuery, region);
    };

    static navigationOptions({ navigation }) {
        return {
            header: (
                <Header
                    navigation={navigation}
                    showBack={false}
                    showBrands={true}
                    showFueltypes={true}
                    showSearch={true}
                />
            )
        };
    };

    render() {
        return (
            <MapView
                loadingEnabled={true}
                onRegionChangeComplete={this._onRegionChange}
                pitchEnabled={false}
                region={this.state.region}
                showsBuildings={false}
                showsTraffic={true}
                showsMyLocationButton={true}
                showsUserLocation={true}
                style={styles.map}
            >
                <Marker
                    coordinate={{ latitude: this.state.region.latitude, longitude: this.state.region.longitude }}
                    title={'Marker!'}
                    colour={'#FF0000'}
                    text={'139.9'}
                />
            </MapView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedBrands: state.ui.brands,
        selectedFueltypes: state.ui.fueltype,
    };
};

export default connect(mapStateToProps)(Map);