export const SET_FUELTYPE = 'SET_FUELTYPE';
export const UI_INITIALISE = 'UI_INITIALISE';

export function initialiseUI(initialPayload) {
    return {
        type: UI_INITIALISE,
        payload: initialPayload
    };
}

export function setFueltype(fueltype) {
    return {
        type: SET_FUELTYPE,
        payload: fueltype
    };
};