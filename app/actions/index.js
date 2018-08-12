const SET_FUELTYPE = 'SET_FUELTYPE';

export function setFueltype(fueltype) {
    return {
        type: SET_FUELTYPE,
        payload: fueltype
    };
};