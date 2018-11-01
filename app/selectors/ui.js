import _ from 'lodash';

import { getStation } from './db';

export const getFavourites = (state) => {
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

export const isBrandSelected = (state, props) => {
    const brands = getSelectedBrands(state);
    return _(brands).includes(props.item.name);
};

export const isFueltypeSelected = (state, props) => {
    const fueltype = getSelectedFueltype(state);
    return fueltype == props.item.code;
};

export const isStationFavourited = (state, props) => {
    const favourites = getFavourites(state);
    return _(favourites).includes(props.station);
};