import { combineReducers } from 'redux';

import brandsReducer from './brands';
import fueltypesReducer from './fueltypes';

export default combineReducers(
    {
        brands: brandsReducer,
        fueltypes: fueltypesReducer,
    }
);