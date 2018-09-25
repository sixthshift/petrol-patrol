import { Location, MapView, Permissions } from 'expo';
import React from 'react';
import { connect } from 'react-redux';

import { setLocationAction } from '../../actions';
import defaultRegion from './defaultRegion';
import Header from '../header';
import Marker from './marker';
import { noLocationPermissions } from './strings';
import styles from './styles';

class Map extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            region: props.location,
        };
    }

    componentDidMount() {
        this._getLocationAsync();
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
        this.props.setLocation(region);
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
                {this.props.stations.map((station) => (
                    <Marker
                        key={station.id}
                        station={station}
                    />
                ))}
            </MapView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        stations: state.db.stations,
        location: state.location,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLocation: (location) => {
            dispatch(setLocationAction(location))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);