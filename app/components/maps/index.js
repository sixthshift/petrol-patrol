import { Location, Permissions } from 'expo';
import { filter, includes, isEqual, omit } from 'lodash';
import { Container, Content } from 'native-base';
import React from 'react';
import { ToastAndroid, View } from 'react-native';
import ClusteredMapView from 'react-native-maps-super-cluster';
import { connect } from 'react-redux';

import { setRegionAction, setLocationAction } from '../../actions';
import Cluster from './cluster';
import Footer from '../footer';
import Header from '../header';
import Marker from './marker';
import { getStations, getRegion, getSelectedBrands } from '../../selectors';
import { noLocationPermissions } from '../strings';
import styles from './styles';
import { encompassingRegion } from '../utils';

class Map extends React.Component {

    componentDidMount() {
        const getLocation = this.props.navigation.getParam('getLocation', false);
        if (getLocation) {
            this._getLocationAsync();
        }
    }

    _moveToRegion(region) {
        this.map.mapview.animateToRegion(region);
    }

    _getLocationAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === 'granted') {
            const location = await Location.getCurrentPositionAsync({});
            const region = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: this.props.region.latitudeDelta,
                longitudeDelta: this.props.region.longitudeDelta,
            };
            this.props.setLocation(location.coords);
            this._moveToRegion(region);
        } else {
            ToastAndroid.show(noLocationPermissions, ToastAndroid.LONG);
        }
    };

    _onRegionChange = (region) => {
        this.props.setRegion(region);
    };

    onSearch = (stations) => {
        this._moveToRegion(encompassingRegion(stations));
    }

    render() {
        return (
            <Container>
                <Header
                    content={this}
                    showBack={false}
                    showBrands={true}
                    showFueltypes={true}
                    showSearch={true}
                />
                <ClusteredMapView
                    data={this.props.stations}
                    loadingEnabled={true}
                    onRegionChangeComplete={this._onRegionChange}
                    pitchEnabled={false}
                    initialRegion={this.props.region}
                    ref={map => this.map = map}
                    renderMarker={this.renderMarker}
                    renderCluster={this.renderCluster}
                    showsBuildings={false}
                    showsTraffic={true}
                    showsMyLocationButton={true}
                    showsUserLocation={true}
                    style={styles.map}
                />
                <Footer />
            </Container>
        );
    }

    renderCluster(cluster, onPress) {
        return <Cluster
            {...cluster}
            onPress={onPress}
        />;
    }

    renderMarker(station) {
        return <Marker
            // https://github.com/react-native-community/react-native-maps/issues/578
            key={station.id + Math.random()} // append random number to ensure component is unique and does not get overriden
            station={station}
        />;
    }

    shouldComponentUpdate(nextProps) {
        const before = omit(this.props, 'region');
        const after = omit(nextProps, 'region');
        return !isEqual(before, after);
    }
}

const mapStateToProps = (state) => {
    const selectedBrands = getSelectedBrands(state);
    const stations = filter(getStations(state), (station) => (includes(selectedBrands, station.brand)));
    return {
        stations: stations,
        region: getRegion(state),
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
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);