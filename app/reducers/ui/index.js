import { combineReducers } from 'redux';

import brandsReducer from './brands';
import fueltypeReducer from './fueltypes';

export default combineReducers(
    {
        brands: brandsReducer,
        fueltypes: fueltypeReducer,
    }
);