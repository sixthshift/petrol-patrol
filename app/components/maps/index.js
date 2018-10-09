import { Location, Permissions } from 'expo';
import { isEqual, omit, slice } from 'lodash';
import React from 'react';
import ClusteredMapView from 'react-native-maps-super-cluster';
import { connect } from 'react-redux';

import { setRegionAction } from '../../actions';
import Cluster from './cluster';
import Header from '../header';
import Marker from './marker';
import { noLocationPermissions } from './strings';
import styles from './styles';

class Map extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            region: props.region,
        };
    }

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
                latitudeDelta: this.state.region.latitudeDelta,
                longitudeDelta: this.state.region.longitudeDelta,
            };
            this._moveToRegion(region);
        } else {
            ToastAndroid.show(noLocationPermissions, ToastAndroid.LONG);
        }
    };

    _onRegionChange = (region) => {
        this.props.setRegion(region);
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
            >
            </ClusteredMapView>
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
        // stations: slice(state.db.stations, 0, 1),
        stations: state.db.stations,
        region: state.region,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setRegion: (region) => {
            dispatch(setRegionAction(region))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);