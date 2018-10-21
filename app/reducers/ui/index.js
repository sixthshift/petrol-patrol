import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import brandsReducer from './brands';
import favouritesReducer from './favourites';
import fueltypeReducer from './fueltypes';
import regionReducer from './region';

const persistConfig = {
    key: 'ui',
    storage: storage,
};

const reducer = combineReducers(
    {
        brands: brandsReducer,
        favourites: favouritesReducer,
        fueltype: fueltypeReducer,
        region: regionReducer,
    }
);

export default persistReducer(persistConfig, reducer);