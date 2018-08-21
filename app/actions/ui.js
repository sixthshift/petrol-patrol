import { createAction } from 'redux-actions';

export const FUELTYPE_SELECT = 'FUELTYPE_SELECT';
export const selectFueltype = createAction(FUELTYPE_SELECT);

export const BRANDS_SELECT = 'BRANDS_SELECT';
export const selectBrands = createAction(BRANDS_SELECT);