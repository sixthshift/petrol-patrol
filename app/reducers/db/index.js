import { combineReducers } from 'redux';

import brandsReducer from './brands';
import fueltypesReducer from './fueltypes';
import pricesReducer from './prices';
import stationsReducer from './stations';
import statisticsReducer from './statistics';

export default combineReducers(
    {
        brands: brandsReducer,
        fueltypes: fueltypesReducer,
        prices: pricesReducer,
        stations: stationsReducer,
        statistics: statisticsReducer,
    }
);