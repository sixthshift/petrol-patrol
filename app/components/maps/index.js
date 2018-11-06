import { Location, Permissions } from 'expo';
import { isEqual, omit } from 'lodash';
import { Container, Content } from 'native-base';
import React from 'react';
import ClusteredMapView from 'react-native-maps-super-cluster';
import { connect } from 'react-redux';

import { setRegionAction, setLocationAction } from '../../actions';
import Cluster from './cluster';
import Footer from '../footer';
import Header from '../header';
import Marker from './marker';
import { getStations, getRegion } from '../../selectors';
import { noLocationPermissions } from '../strings';
import styles from './styles';
import { encompassingRegion } from '../utils';

class Map extends React.Component {

    componentDidMount() {
        this._getLocationAsync();
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
                <Content>
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
                </Content>
                <Footer />
            </Container>
        );
    }

    renderCluster(cluster, onPress) {
        return <Cluster
            cluster={cluster}
            onPress={onPress}
        />;
    }

    renderMarker(station) {
        return <Marker
            key={station.id}
            station={station}
        />;
    }

    shouldComponentUpdate(nextProps, nextState) {
        const before = omit(this.props, 'region');
        const after = omit(nextProps, 'region');
        return !isEqual(before, after);
    }
}

const mapStateToProps = (state) => {
    return {
        stations: getStations(state),
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