import _, { get, last } from 'lodash';
import moment from 'moment';
import { Body, Left, ListItem, Right, Text, H1 } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { fetchPrice } from '../../../actions/db';
import gradiate from '../../maps/gradient';
import styles from './styles';
import { hash } from '../../../utils';

class PriceListItem extends React.Component {

    _colour() {
        if (_(this.props.price).isNull() || _(this.props.statistics).isNull()) {
            return 'grey';
        } else {
            const stdev = this.props.statistics.stdev;
            const mean = this.props.statistics.mean;
            const lowerBound = mean - stdev * 2;
            const upperBound = mean + stdev * 2;
            return gradiate(lowerBound, upperBound, this.props.price.price);
        }
    }

    componentDidMount() {
        if (_(this.props.price).isNull()) {
            this.props.fetchPrice(this.props.station, this.props.item.code);
        }
    }

    render() {
        if (_(this.props.price).isNull()) {
            return (null);
        } else {
            const timeDifference = moment.unix(this.props.price.time).fromNow();
            return (
                <View style={{ ...styles.bar, backgroundColor: this._colour() }}>
                    <ListItem style={styles.item}>
                        <Left>
                            <Body>
                                <H1>{this.props.price.price}</H1>
                                <Text note>Last updated {timeDifference}</Text>
                            </Body>
                        </Left>
                        <Right>
                            <Body>
                                <H1>{this.props.item.code}</H1>
                                <Text note>{this.props.item.name}</Text>
                            </Body>
                        </Right>
                    </ListItem>
                </View>
            );
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const key = {
        id: ownProps.station.id,
        fueltype: ownProps.item.code,
    };
    const hashID = hash(key);
    const price = get(state.db.prices, hashID, null);
    const statistics = get(last(state.db.statistics), state.ui.fueltype, null);
    return {
        price: price,
        statistics: statistics,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPrice: (stationID, fueltype) => {
            dispatch(fetchPrice(stationID, fueltype))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PriceListItem);