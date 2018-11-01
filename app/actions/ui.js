import { createAction } from 'redux-actions';

export const BRANDS_SELECT = 'BRANDS_SELECT';
export const selectBrandsAction = createAction(BRANDS_SELECT);

export const FAVOURITES_SELECT = 'FAVOURITES_SELECT';
export const selectFavouritesAction = createAction(FAVOURITES_SELECT);

export const FUELTYPE_SELECT = 'FUELTYPE_SELECT';
export const selectFueltypeAction = createAction(FUELTYPE_SELECT);

export const REGION_SET = 'REGION_SET';
export const setRegionAction = createAction(REGION_SET);