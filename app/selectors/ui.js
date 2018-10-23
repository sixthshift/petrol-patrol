import _ from 'lodash';

export const getFavourites = (state) => {
    return state.ui.favourites;
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

};