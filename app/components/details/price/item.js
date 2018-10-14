import _, { get } from 'lodash';
import { Body, ListItem, Text } from 'native-base';
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
            return (
                <ListItem>
                    <Body>
                        <Text>{this.props.item.code}</Text>
                        <Text>{this.props.price.price}</Text>
                    </Body>
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