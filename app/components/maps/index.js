import { Location, Permissions } from 'expo';
import { isEqual, memoize, omit } from 'lodash';
import { Container } from 'native-base';
import React from 'react';
import { Dimensions, ToastAndroid } from 'react-native';
import ClusteredMapView from 'react-native-maps-super-cluster';
import { connect } from 'react-redux';

import { setRegionAction, setLocationAction } from '../../actions';
import Cluster from './cluster';
import { extent, mapEdgePadding, radius } from '../../constants/maps';
import Footer from '../footer';
import Header from './header';
import Marker from './marker';
import { getRegion, getStationsFilteredyBrands } from '../../selectors';
import { locationNotFound, noLocationPermissions } from '../strings';
import styles from './styles';
import { encompassingRegion } from '../../utils';

class Map extends React.Component {

    constructor(props) {
        super(props);
        this.renderCluster = this.renderCluster.bind(this);
        this.state = {
            styles: {
                ...styles.map,
                // Hack to re-render map component so that gps button appears
                // https://github.com/react-native-community/react-native-maps/issues/1033
                width: Dimensions.get('window').width - 1,
            }
        };
    }

    componentDidMount() {
        const getLocation = this.props.navigation.getParam('getLocation', false);
        if (getLocation) {
            this._getLocationAsync();
        }
    }

    _moveToRegion(region) {
        this.map.getMapRef().animateToRegion(region);
    }

    _getLocationAsync = async (retries = 3) => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === 'granted') {
            try {
                const location = await Location.getCurrentPositionAsync({});
                const region = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: this.props.region.latitudeDelta,
                    longitudeDelta: this.props.region.longitudeDelta,
                };
                this.props.setLocation(location.coords);
                this._moveToRegion(region);
            } catch (error) {
                if (retries > 0) {
                    this._getLocationAsync(retries - 1);
                } else {
                    ToastAndroid.show(locationNotFound, ToastAndroid.LONG);
                }
            }
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

    renderCluster(cluster, onPress) {
        return <Cluster
            {...cluster}
            clusterEngine={this.map.getClusteringEngine()}
            onPress={onPress}
        />;
    }

    renderMarker(station) {
        return <Marker
            key={'marker-' + station.id}
            station={station}
        />;
    }

    shouldComponentUpdate(nextProps, nextState) {
        const beforeProps = omit(this.props, 'region');
        const afterProps = omit(nextProps, 'region');
        const beforeState = this.state;
        const afterState = nextState;
        return !isEqual(beforeProps, afterProps) || beforeState != afterState;
    }

    render() {
        return (
            <Container>
                <Header
                    content={this}
                />
                <ClusteredMapView
                    data={this.props.stations}
                    edgePadding={mapEdgePadding}
                    extent={extent}
                    initialRegion={this.props.region}
                    loadingEnabled={true}
                    onRegionChangeComplete={this._onRegionChange}
                    pitchEnabled={false}
                    radius={radius()}
                    ref={map => this.map = map}
                    renderMarker={this.renderMarker}
                    renderCluster={this.renderCluster}
                    showsBuildings={false}
                    showsTraffic={true}
                    showsMyLocationButton={true}
                    showsUserLocation={true}
                    style={this.state.styles}
                />
                <Footer />
            </Container>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        region: getRegion(state),
        stations: getStationsFilteredyBrands(state),
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