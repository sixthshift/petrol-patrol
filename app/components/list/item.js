import moment from 'moment';
import { Body, H1, Left, ListItem, Right, Text } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import _ from 'lodash';

import { fetchPrice } from '../../actions';
import styles from './styles';
import { getPrice, getMostRecentStatistics, getSelectedFueltype } from '../../selectors';
import { colour } from '../utils';

class Item extends React.Component {

    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
    }

    componentDidMount() {
        if (_(this.props.price).isNull()) {
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
        if (_(this.props.price).isNull()) {
            return (null);
        } else {
            const timeDifference = moment.unix(this.props.price.time).fromNow();
            return (
                <View style={{ ...styles.bar, backgroundColor: colour(this.props.price, this.props.statistics) }}>
                    <ListItem onPress={this.onPress} style={styles.item}>
                        <Left>
                            <Body>
                                <H1>{this.props.price.price}</H1>
                                <Text note>Last Updated</Text>
                                <Text note>{timeDifference}</Text>
                            </Body>
                        </Left>
                        <Body>
                            <Text>{this.props.station.name}</Text>
                            <Text>{this.props.station.suburb + ' ' + this.props.station.postcode + ' ' + this.props.station.state}</Text>
                        </Body>
                        <Right>
                            <Body>
                                <Text></Text>
                            </Body>
                        </Right>
                    </ListItem>
                </View>
            );
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const props = { ...ownProps, fueltype: getSelectedFueltype(state) };
    return {
        price: getPrice(state, props),
        selectedFueltype: getSelectedFueltype(state),
        statistics: getMostRecentStatistics(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPrice: (stationID, fueltype) => {
            dispatch(fetchPrice(stationID, fueltype))
        }
    };
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Item));