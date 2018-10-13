import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import dbReducer from './db';
import regionReducer from './region';
import uiReducer from './ui';

const persistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['region'],
};

const reducer = combineReducers({
    db: dbReducer,
    region: regionReducer,
    ui: uiReducer,
});

export default persistReducer(persistConfig, reducer);