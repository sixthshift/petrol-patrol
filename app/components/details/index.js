import { MapView } from 'expo';
import _ from 'lodash';
import { Body, Card, Content, CardItem, Left, Text, Container } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';

import Header from './header';
import { getStation } from '../../selectors';
import styles from './styles';
import PriceList from './price';

class Details extends React.Component {

    render() {
        const region = {
            ...this.props.station.location,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        };
        return (
            <Container>
                <Header />
                <Content contentContainerStyle={styles.details}>
                    <Card style={[styles.card, styles.info]} transparent={true}>
                        <CardItem>
                            <Left>
                                <Body>
                                    <Text>{this.props.station.name}</Text>
                                    <Text note>{this.props.station.street}</Text>
                                    <Text note>{this.props.station.suburb}</Text>
                                    <Text note>{this.props.station.state + ' ' + this.props.station.postcode}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                    </Card>
                    <Card style={[styles.card, styles.map]}>
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
                    </Card>
                    <Card style={[styles.card, styles.list]}>
                        <PriceList station={this.props.station} style={styles.list} />
                    </Card>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const props = { id: ownProps.navigation.state.params['id'] };
    return {
        station: getStation(state, props)
    };
};

export default connect(mapStateToProps)(Details);