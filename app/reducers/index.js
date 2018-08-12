import { combineReducers } from 'redux';

import dbReducer from './db';
import locationReducer from './location';
import uiReducer from './ui';

export default combineReducers({
    db: dbReducer,
    location: locationReducer,
    ui: uiReducer,
});