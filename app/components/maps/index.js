import { Location, Permissions } from 'expo';
import { filter, includes, isEqual, memoize, omit } from 'lodash';
import { Container } from 'native-base';
import React from 'react';
import { Dimensions, ToastAndroid } from 'react-native';
import ClusteredMapView from 'react-native-maps-super-cluster';
import { connect } from 'react-redux';

import { setRegionAction, setLocationAction } from '../../actions';
import Cluster from './cluster';
import { extent } from '../../constants/maps';
import Footer from '../footer';
import Header from '../header';
import Marker from './marker';
import { getStations, getRegion, getSelectedBrands } from '../../selectors';
import { noLocationPermissions } from '../strings';
import styles from './styles';
import { encompassingRegion } from '../../utils';

const radius = memoize(() => {
    const screenWidth = Dimensions.get('window').width;
    const portion = 0.075; // portion of the screen
    return screenWidth * portion;
});

class Map extends React.Component {

    constructor(props) {
        super(props);
        this.renderCluster = this.renderCluster.bind(this);
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

    renderCluster(cluster, onPress) {
        return <Cluster
            {...cluster}
            clusterEngine={this.map.getClusteringEngine()}
            onPress={onPress}
        />;
    }

    renderMarker(station) {
        return <Marker
            // https://github.com/react-native-community/react-native-maps/issues/578
            // key={station.id + Math.random()} // append random number to ensure component is unique and does not get overriden
            key={'marker-' + station.id}
            station={station}
        />;
    }

    shouldComponentUpdate(nextProps) {
        const before = omit(this.props, 'region');
        const after = omit(nextProps, 'region');
        return !isEqual(before, after);
    }

    render() {
        return (
            <Container>
                <Header
                    content={this}
                    showBack={false}
                    showBrands={true}
                    showFueltypes={true}
                    showList={true}
                    showSearch={true}
                />
                <ClusteredMapView
                    data={this.props.stations}
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
                    style={styles.map}
                />
                <Footer />
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const selectedBrands = getSelectedBrands(state);
    const stations = filter(getStations(state), (station) => (includes(selectedBrands, station.brand)));
    return {
        region: getRegion(state),
        stations: stations,
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