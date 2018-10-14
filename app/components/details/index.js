import { MapView } from 'expo';
import _ from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Header from '../header';
import styles from './styles';
import PriceList from './price';

class Details extends React.Component {

    static navigationOptions({ navigation }) {
        return {
            header: (
                <Header
                    navigation={navigation}
                    showBack={true}
                    showBrands={false}
                    showFueltypes={false}
                    showSearch={false}
                />
            )
        };
    };

    render() {
        const region = {
            latitude: this.props.station.location.latitude,
            longitude: this.props.station.location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        };
        return (
            <View
                style={styles.details}
            >
                <MapView
                    initialRegion={region}
                    style={styles.map}
                >
                </MapView>
                <PriceList station={this.props.station} style={styles.list} />
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