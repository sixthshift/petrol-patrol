import _, { get, isArray, last } from 'lodash';

import { hash } from '../utils';

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
    const prices = getPrices(state);
    const key = {
        id: props.station.id,
        fueltype: props.fueltype,
    };
    const hashID = hash(key);
    const price = get(prices, hashID, null);
    if (isArray(price)) {
        return last(price);
    } else {
        return null;
    }
};

export const getStatistics = (state) => {
    return state.db.statistics;
};

export const getMostRecentStatistics = (state) => {
    const statistics = getStatistics(state);
    if (_(statistics).isEmpty()) {
        return null;
    } else {
        return last(statistics);
    }
};