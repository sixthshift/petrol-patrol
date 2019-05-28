import _, { map, reduce } from 'lodash';
import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect'

import { getStation, getStations, getStationsPartitionedByBrands } from './db';
import { createDeepEqualsSelector } from '../utils';

export const getFavourites = (state) => {
    return state.ui.favourites;
};

export const getFavouriteStations = (state) => {
    return _(state.ui.favourites).map((stationID) => {
        const props = { id: stationID };
        return getStation(state, props);
    }).value();
};

export const getLocation = (state) => {
    return state.ui.location;
};

export const getRegion = (state) => {
    return state.ui.region;
};

export const getSelectedBrands = (state) => {
    return state.ui.brands;
};

export const getSelectedFueltype = (state) => {
    return state.ui.fueltype;
};

export const getVisible = (state) => {
    return state.ui.visible;
};

export const getStationsFilteredyBrands = createSelector(
    getSelectedBrands,
    getStationsPartitionedByBrands,
    (brands, partition) => {
        const stationsSelectedByBrands = reduce(brands, (accumulator, brand) => {
            return [...accumulator, ...partition[brand]];
        }, []);
        return stationsSelectedByBrands;
    }
);

export const getVisibleStations = createSelector(
    getVisible,
    getStations,
    (visible, stations) => {
        const state = { db: { stations: stations } };
        return map(visible, (stationID) => {
            const props = { id: stationID };
            return getStation(state, props);
        });
    }
);

export const isBrandSelected = createCachedSelector(
    [getSelectedBrands, (_, props) => (props)],
    (brands, props) => {
        return _(brands).includes(props.item.name);
    }
)(
    (_, props) => (props.item.name),
    {
        selectorCreator: createDeepEqualsSelector
    }
);

export const isFueltypeSelected = createCachedSelector(
    [getSelectedFueltype, (_, props) => (props)],
    (fueltype, props) => {
        return fueltype === props.item.code;
    }
)(
    (_, props) => (props.item.code),
    {
        selectorCreator: createDeepEqualsSelector
    }
);

export const isStationFavourited = createCachedSelector(
    [getFavouriteStations, (_, props) => (props)],
    (favourites, props) => {
        return _(favourites).includes(props.station);
    }
)(
    (_, props) => (props.station.id),
    {
        selectorCreator: createDeepEqualsSelector
    }
);