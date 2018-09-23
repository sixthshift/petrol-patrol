import { combineReducers } from 'redux';

import brandsReducer from './brands';
import fueltypesReducer from './fueltypes';
import stationsReducer from './stations';

export default combineReducers(
    {
        brands: brandsReducer,
        fueltypes: fueltypesReducer,
        stations: stationsReducer,
    }
);