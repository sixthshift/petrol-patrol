import { createStore, applyMiddleware } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from '../reducers';

const persistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['location'],
    debug: true,
};

const rootReducer = persistReducer(persistConfig, reducer);

export default store = createStore(
    rootReducer,
    applyMiddleware(
        thunk,
        logger
    )
);