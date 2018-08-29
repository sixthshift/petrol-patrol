import { createAction } from 'redux-actions';

export const FUELTYPE_SELECT = 'FUELTYPE_SELECT';
export const selectFueltypeAction = createAction(FUELTYPE_SELECT);

export const BRANDS_SELECT = 'BRANDS_SELECT';
export const selectBrandsAction = createAction(BRANDS_SELECT);