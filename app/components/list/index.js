import { isEmpty, isEqual, isNil, map, omit, sortBy } from 'lodash';
import { Body, Container, Content } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';

import { reorderVisibleMarkerAction } from '../../actions';
import FlatList from '../flatlist';
import Header from './header';
import { getLocation, getPrice, getPrices, getSelectedFueltype, getVisibleStationsFilteredByBrands } from '../../selectors';
import { haversine } from '../../utils';

const EmptyState = () => {
    return (null);
};

class List extends React.Component {

    constructor(props) {
        super(props);

        this.sortDistance = this.sortDistance.bind(this);
        this.sortPrice = this.sortPrice.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        const before = omit(this.props, ['prices']);
        const after = omit(nextProps, ['prices']);
        return !isEqual(before, after);
    }

    sortDistance() {
        const from = this.props.location;
        const sorted = sortBy(this.props.stations, (station) => {
            const to = station.location;
            return haversine(from, to);
        });
        const stationIDs = map(this.props.stations, 'id');
        const sortedIDs = map(sorted, 'id');

        // If the list is already sorted, reverse the order of the sorted list
        if (isEqual(stationIDs, sortedIDs)) {
            sortedIDs.reverse();
        }
        this.props.reorder(sortedIDs);
    }

    sortPrice() {
        const state = { db: { prices: this.props.prices } };
        const sorted = sortBy(this.props.stations, (station) => {
            const props = { fueltype: this.props.fueltype, station: station };
            const price = getPrice(state, props);
            return isNil(price) ? Number.MAX_SAFE_INTEGER : price.price;
        });
        const stationIDs = map(this.props.stations, 'id');
        const sortedIDs = map(sorted, 'id');

        // If the list is already sorted, reverse the order of the sorted list
        if (isEqual(stationIDs, sortedIDs)) {
            sortedIDs.reverse();
        }
        this.props.reorder(sortedIDs);
    }

    render() {
        return (
            <Container>
                <Header
                    content={this}
                />
                <Content>
                    {isEmpty(this.props.stations) ? (
                        <Body>
                            <EmptyState />
                        </Body>
                    ) : (
                            <FlatList
                                data={this.props.stations}
                            />
                        )
                    }
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        fueltype: getSelectedFueltype(state),
        location: getLocation(state),
        prices: getPrices(state),
        stations: getVisibleStationsFilteredByBrands(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        reorder: (visible) => {
            dispatch(reorderVisibleMarkerAction(visible));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);