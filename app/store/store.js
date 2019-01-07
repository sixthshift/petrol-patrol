import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { __REMOTEDEV__ } from '../constants/app';
import reducer from '../reducers';

const middleware = [
    thunk
];

if (__REMOTEDEV__) {
    middleware.push(logger);
}

export default createStore(
    reducer,
    applyMiddleware(...middleware)
);