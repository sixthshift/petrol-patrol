import { combineReducers } from 'redux';

import dbReducer from './db';
import uiReducer from './ui';

const reducer = combineReducers({
    db: dbReducer,
    ui: uiReducer,
});

export default reducer;