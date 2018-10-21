import { combineReducers } from 'redux';

import brandsReducer from './brands';
import favouritesReducer from './favourites';
import fueltypeReducer from './fueltypes';
import regionReducer from './region';

export default combineReducers(
    {
        brands: brandsReducer,
        favourites: favouritesReducer,
        fueltype: fueltypeReducer,
        region: regionReducer,
    }
);