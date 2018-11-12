import _, { get, isArray, last, map } from 'lodash';

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

export const getStatistics = (state, props) => {
    const statistics = state.db.statistics
    const fueltype = props.fueltype;
    return map(statistics, (statistic) => {
        return get(statistic, fueltype, {});
    });
};

export const getMostRecentStatistics = (state, props) => {
    const statistics = getStatistics(state, props);
    if (_(statistics).isEmpty()) {
        return null;
    } else {
        return last(statistics);
    }
};