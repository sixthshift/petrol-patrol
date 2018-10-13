import { createStore, applyMiddleware } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from '../reducers';

const persistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['prices', 'region', 'statistics'],
};

const rootReducer = persistReducer(persistConfig, reducer);

const middleware = [
    thunk
];

if (__DEV__) {
    middleware.push(logger);
}

export default store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
);