import { get, isNil, isUndefined, lowerCase, startCase } from 'lodash';
import moment from 'moment';
import { Body, H1, Left, ListItem, Right, Text } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import { fetchPrice } from '../../actions';
import { getLocation, getPrice, getMostRecentStatistics, getRegion, getSelectedFueltype } from '../../selectors';
import styles from './styles';
import { colour, distance } from '../../utils';

class Item extends React.Component {

    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
    }

    componentDidMount() {
        if (isUndefined(this.props.price)) {
            this.props.fetchPrice(this.props.station, this.props.selectedFueltype);
        }
    }

    onPress() {
        const props = {
            id: this.props.station.id,
        };
        this.props.navigation.navigate('details', props);
    }

    render() {
        if (isNil(this.props.price)) {
            return (null);
        } else {
            const timeDifference = moment.unix(this.props.price.timestamp).fromNow();
            const address1 = this.props.station.name;
            const address2 = startCase(lowerCase(this.props.station.suburb))
                + ' ' + this.props.station.postcode
                + ' ' + this.props.station.state;
            const from = this.props.location;
            const to = this.props.station.location;
            return (
                <View style={{ ...styles.bar, backgroundColor: colour(this.props.price, this.props.statistics) }}>
                    <ListItem onPress={this.onPress} style={styles.item}>
                        <Left style={styles.left}>
                            <Body>
                                <H1>{this.props.price.price}</H1>
                                <Text note>{timeDifference}</Text>
                            </Body>
                        </Left>
                        <Body style={styles.middle}>
                            <Text>{address1}</Text>
                            <Text>{address2}</Text>
                        </Body>
                        <Right style={styles.right}>
                            <Body>
                                <Text>{distance(from, to)}</Text>
                            </Body>
                        </Right>
                    </ListItem>
                </View>
            );
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const station = get(ownProps, 'station');
    const props = { fueltype: getSelectedFueltype(state), station: station };
    return {
        location: getLocation(state),
        price: getPrice(state, props),
        region: getRegion(state),
        selectedFueltype: getSelectedFueltype(state),
        statistics: getMostRecentStatistics(state, props),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPrice: (stationID, fueltype) => {
            dispatch(fetchPrice(stationID, fueltype));
        }
    };
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Item));