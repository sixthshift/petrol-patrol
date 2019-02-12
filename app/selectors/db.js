import _, { get, isArray, isEmpty, isNil, isUndefined, last } from 'lodash';

import createCachedSelector from 're-reselect';

import { createDeepEqualsSelector, hash } from '../utils';


export const getAnalysis = (state) => {
    return state.db.analysis;
};

export const getBrands = (state) => {
    return state.db.brands;
};

export const getFueltypes = (state) => {
    return state.db.fueltypes;
};

export const getPrices = (state) => {
    return state.db.prices;
};

export const getStations = (state) => {
    return state.db.stations;
};

export const getStatistics = (state) => {
    return state.db.statistics;
};

// Reselect selectors

export const getPriceHistory = createCachedSelector(
    [getPrices, (_, props) => (props)],
    (prices, props) => {
        const key = {
            id: props.station.id,
            fueltype: props.fueltype,
        };
        const hashID = hash(key);
        const price = get(prices, hashID, null);
        if (isArray(price) && isEmpty(price)) {
            return null;
        }
        else if (isArray(price) && !isEmpty(price)) {
            return price;
        } else {
            return undefined;
        }
    }
)(
    (_, props) => {
        const key = {
            id: props.station.id,
            fueltype: props.fueltype,
        };
        return hash(key);
    },
    {
        selectorCreator: createDeepEqualsSelector
    }
);

export const getPrice = createCachedSelector(
    [getPriceHistory],
    (prices) => {
        if (isNil(prices)) {
            return prices;
        } else {
            return last(prices);
        }
    }
)(
    (_, props) => {
        const key = {
            id: props.station.id,
            fueltype: props.fueltype,
        };
        return hash(key);
    },
);

export const getStation = createCachedSelector(
    [getStations, (_, props) => (props)],
    (stations, props) => {
        const id = _(props).pick('id').value();
        return _(stations).find(id);
    }
)(
    (_, props) => (props.id),
    {
        selectorCreator: createDeepEqualsSelector
    }
);

export const getStatisticsForFueltype = createCachedSelector(
    [getStatistics, (_, props) => (props)],
    (statistics, props) => {
        const fueltype = props.fueltype;
        return _(statistics)
            .map((statistic) => (get(statistic, fueltype, undefined)))
            .reject(isUndefined)
            .value();
    }
)(
    (_, props) => (props.fueltype),
    {
        selectorCreator: createDeepEqualsSelector
    }
);

export const getMostRecentStatistics = createCachedSelector(
    [getStatisticsForFueltype],
    (statistics) => {
        if (_(statistics).isEmpty()) {
            return null;
        } else {
            return last(statistics);
        }
    }
)(
    (_, props) => (props.fueltype)
);