import { Location, MapView, Permissions } from 'expo';
import React from 'react';

import { defaultRegion } from './constants';
import Header from '../header';
import Marker from './marker';
import { noLocationPermissions } from './strings';
import styles from './styles';

export default class Map extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            region: defaultRegion
        };
    }

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
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            };
            this.setState({ ...this.state, region });
        } else {
            ToastAndroid.show(noLocationPermissions, ToastAndroid.LONG);
        }
    };

    changeRegion = (region) => {
        this.setState({ ...this.state, region });
    };

    render() {
        return (
            <MapView
                loadingEnabled={true}
                onRegionChangeComplete={this.changeRegion}
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