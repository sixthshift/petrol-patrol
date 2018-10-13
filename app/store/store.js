import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from '../reducers';

const middleware = [
    thunk
];

if (__DEV__) {
    middleware.push(logger);
}

export default store = createStore(
    reducer,
    applyMiddleware(...middleware)
);