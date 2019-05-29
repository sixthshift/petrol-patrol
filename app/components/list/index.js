import { isEmpty, isEqual, isNil, map, omit, sortBy } from 'lodash';
import { Body, Container, Content } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';

import { reorderVisibleMarkerAction } from '../../actions';
import FlatList from '../flatlist';
import Header from '../header';
import { getPrice, getPrices, getRegion, getSelectedFueltype, getVisibleStationsFilteredByBrands } from '../../selectors';
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
        const from = this.props.region;
        const sorted = sortBy(this.props.stations, (station) => {
            const to = station.location;
            return haversine(from, to);
        });
        const sortedIDs = map(sorted, 'id');
        this.props.reorder(sortedIDs);
    }

    sortPrice() {
        const state = { db: { prices: this.props.prices } };
        const sorted = sortBy(this.props.stations, (station) => {
            const props = { fueltype: this.props.fueltype, station: station };
            const price = getPrice(state, props);
            return isNil(price) ? Number.MAX_SAFE_INTEGER : price.price;
        });
        const sortedIDs = map(sorted, 'id');
        this.props.reorder(sortedIDs);
    }

    render() {
        return (
            <Container>
                <Header
                    content={this}
                    showBack={true}
                    showBrands={true}
                    showFueltypes={true}
                    showSearch={false}
                    showSortByDistance={true}
                    showSortByPrice={true}
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
        region: getRegion(state),
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