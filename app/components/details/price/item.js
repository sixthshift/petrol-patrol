import _, { get } from 'lodash';
import moment from 'moment';
import { Body, Left, ListItem, Right, Text, H1 } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';

import { fetchPrice } from '../../../actions/db';
import { hash } from '../../../utils';

class PriceListItem extends React.Component {

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
                <ListItem>
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
    return {
        price: price,
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