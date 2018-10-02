import { combineReducers } from 'redux';

import dbReducer from './db';
import regionReducer from './region';
import uiReducer from './ui';

export default combineReducers({
    db: dbReducer,
    region: regionReducer,
    ui: uiReducer,
});