import { createAction } from 'redux-actions';

export const BRANDS_SELECT = 'BRANDS_SELECT';
export const selectBrandsAction = createAction(BRANDS_SELECT);

export const FAVOURITES_SELECT = 'FAVOURITES_SELECT';
export const selectFavouritesAction = createAction(FAVOURITES_SELECT);

export const FAVOURITES_REORDER = 'FAVOURITES_REORDER';
export const reorderFavouritesAction = createAction(FAVOURITES_REORDER);

export const FUELTYPE_SELECT = 'FUELTYPE_SELECT';
export const selectFueltypeAction = createAction(FUELTYPE_SELECT);

export const LOCATION_SET = 'LOCATION_SET';
export const setLocationAction = createAction(LOCATION_SET);

export const REGION_SET = 'REGION_SET';
export const setRegionAction = createAction(REGION_SET);

export const VISIBLE_MARKER_ADD = 'VISIBLE_MARKER_ADD';
export const addVisibleMarkerAction = createAction(VISIBLE_MARKER_ADD);

export const VISIBLE_MARKER_REMOVE = 'VISIBLE_MARKER_REMOVE';
export const removeVisibleMarkerAction = createAction(VISIBLE_MARKER_REMOVE);

export const VISIBLE_MARKER_REORDER = 'VISIBLE_MARKER_REORDER';
export const reorderVisibleMarkerAction = createAction(VISIBLE_MARKER_REORDER);