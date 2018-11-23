import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import analysisReducer from './analysis';
import brandsReducer from './brands';
import fueltypesReducer from './fueltypes';
import pricesReducer from './prices';
import stationsReducer from './stations';
import statisticsReducer from './statistics';

const persistConfig = {
    key: 'db',
    storage: storage,
    blacklist: ['analysis', 'prices', 'statistics'],
};

const reducer = combineReducers(
    {
        analysis: analysisReducer,
        brands: brandsReducer,
        fueltypes: fueltypesReducer,
        prices: pricesReducer,
        stations: stationsReducer,
        statistics: statisticsReducer,
    }
);

export default persistReducer(persistConfig, reducer);