import _, { get, isArray, isEmpty, isNil, isUndefined, last } from 'lodash';

import { hash } from '../utils';

export const getAnalysis = (state) => {
    return state.db.analysis;
};

export const getBrands = (state) => {
    return state.db.brands;
};

export const getFueltypes = (state) => {
    return state.db.fueltypes;
};

export const getStations = (state) => {
    return state.db.stations;
};

export const getStation = (state, props) => {
    const stations = getStations(state);
    const id = _(props).pick('id').value();
    return _(stations).find(id);
};

export const getPrices = (state) => {
    return state.db.prices;
};

export const getPrice = (state, props) => {
    const prices = getPriceHistory(state, props);
    if (isNil(prices)) {
        return prices;
    } else {
        return last(prices);
    }
};

export const getPriceHistory = (state, props) => {
    const prices = getPrices(state);
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
};

export const getStatistics = (state, props) => {
    const statistics = state.db.statistics;
    const fueltype = props.fueltype;
    return _(statistics)
        .map((statistic) => (get(statistic, fueltype, undefined)))
        .reject(isUndefined)
        .value();
};

export const getMostRecentStatistics = (state, props) => {
    const statistics = getStatistics(state, props);
    if (_(statistics).isEmpty()) {
        return null;
    } else {
        return last(statistics);
    }
};