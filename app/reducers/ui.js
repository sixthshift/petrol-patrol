import { UI_INITIALISE } from "../actions/ui";

const initialState = {
    brands: [],
    fueltype: "",
};

function setBrands(state, action) {
    switch (action.type) {
        case UI_INITIALISE:
            return action.payload.brands;
        default:
            return state;
    }
}

function setFueltype(state, action) {
    switch (action.type) {
        case UI_INITIALISE:
            return action.payload.fueltype;
        default:
            return state;
    }
}

export default (state = initialState, action) => {
    return {
        brands: setBrands(state.brands, action),
        fueltype: setFueltype(state.fueltype, action),
    };
};