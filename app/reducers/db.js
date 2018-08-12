import { DB_INITIALISE } from '../actions/db';

const initialState = {
    brands: [],
    fueltypes: [],
    prices: [],
    stations: [],
    metrics: [],
};

function updateBrands(state, action) {
    switch (action.type) {
        case DB_INITIALISE:
            return action.payload.brands;
        default:
            return state;
    }
};

function updateFueltypes(state, action) {
    switch (action.type) {
        case DB_INITIALISE:
            return action.payload.fueltypes;
        default:
            return state;
    }
};

export default (state = initialState, action) => {
    return {
        brands: updateBrands(state.brands, action),
        fueltypes: updateFueltypes(state.fueltypes, action),
    };
};