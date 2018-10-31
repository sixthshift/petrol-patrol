import { Linking, MapView } from 'expo';
import _ from 'lodash';
import { Body, Card, Container, Content, CardItem, Fab, Left, Text, Icon } from 'native-base';
import React from 'react';
import { Platform } from 'react-native';
import { connect } from 'react-redux';

import Header from './header';
import { getStation } from '../../selectors';
import styles from './styles';
import PriceList from './price';

class Details extends React.Component {

    constructor(props) {
        super(props);
        this.onNavigatePress = this.onNavigatePress.bind(this);
    }

    onNavigatePress() {
        const daddr = this.props.station.location.latitude + ',' + this.props.station.location.longitude;
        if (Platform.OS === 'ios') {
            Linking.openURL(`http://maps.apple.com/?daddr=${daddr}`);
        } else {
            Linking.openURL(`http://maps.google.com/?daddr=${daddr}`);
        }
    }

    render() {
        const region = {
            ...this.props.station.location,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        };
        return (
            <Container>
                <Header station={this.props.station} />
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
                        <Fab
                            onPress={this.onNavigatePress}
                            position={'bottomRight'}
                        >
                            <Icon type='MaterialIcons' name='directions' />
                        </Fab>
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