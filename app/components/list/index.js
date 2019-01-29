import { get, find, isEmpty, map, sortBy } from 'lodash';
import { Body, Container, Content } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';

import { reorderVisibleMarkerAction } from '../../actions';
import FlatList from '../flatlist';
import Header from '../header';
import { getLocation, getPrice, getSelectedFueltype, getVisible } from '../../selectors';
import { haversine } from '../utils';

const EmptyState = () => {
    return (null);
};

class List extends React.Component {

    constructor(props) {
        super(props);
        this.sort = this.sort.bind(this);
        this.sortByDistance = this.sortByDistance.bind(this);
        this.sortByPrice = this.sortByPrice.bind(this);
    }

    sort(sortBy) {
        let sorted = this.props.visible;
        if (sortBy == 'distance') {
            sorted = this.sortByDistance();
        }
        else if (sortBy == 'price') {
            sorted = this.sortByPrice();
        }
        this.props.reorder(sorted);
    }

    sortByDistance() {
        const from = this.props.location;
        const sorted = sortBy(this.props.visible, (station) => {
            const to = station.location;
            return haversine(from, to);
        });
        return map(sorted, 'id');
    }

    sortByPrice() {
        const sorted = sortBy(this.props.visible, (station) => {
            const price = find(this.props.prices, { id: station.id });
            return get(price, 'price', Infinity);
        });
        return map(sorted, 'id');
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
                    {isEmpty(this.props.visible) ? (
                        <Body>
                            <EmptyState />
                        </Body>
                    ) : (
                            <FlatList
                                data={this.props.visible}
                            />
                        )
                    }
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const visible = getVisible(state);
    const fueltype = getSelectedFueltype(state);
    return {
        location: getLocation(state),
        prices: map(visible, (station) => (getPrice(state, { station: station, fueltype: fueltype }))),
        visible: visible,
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