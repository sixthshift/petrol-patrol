import { MapView } from 'expo';
import _ from 'lodash';
import { Content } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Header from './header';
import styles from './styles';
import PriceList from './price';

class Details extends React.Component {

    static navigationOptions({ navigation }) {
        return {
            header: (
                <Header
                    navigation={navigation}
                />
            )
        };
    };

    render() {
        const region = {
            ...this.props.station.location,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        };
        return (
            <View
                style={styles.details}
            >
                <MapView
                    initialRegion={region}
                    showsMyLocationButton={true}
                    showsUserLocation
                    style={styles.map}
                >
                    <MapView.Marker
                        coordinate={this.props.station.location}
                    />
                </MapView>
                <View style={styles.list}>
                    <Content>
                        <PriceList station={this.props.station} style={styles.list} />
                    </Content>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const stationID = ownProps.navigation.state.params['id'];
    const station = _(state.db.stations).find({ id: stationID });
    return {
        station: station
    };
};

export default connect(mapStateToProps)(Details);