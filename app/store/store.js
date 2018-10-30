import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from '../reducers';

const __REMOTEDEV__ = (typeof atob !== 'undefined');

const middleware = [
    thunk
];

if (__REMOTEDEV__) {
    middleware.push(logger);
}

export default store = createStore(
    reducer,
    applyMiddleware(...middleware)
);