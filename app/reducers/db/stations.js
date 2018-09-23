import { has } from 'lodash';
import { handleAction } from 'redux-actions';

import { STATIONS_FETCH } from '../../actions';

const defaultState = [];

export default handleAction(
    STATIONS_FETCH,
    (state, action) => {
        if (has(action, 'payload')) {
            return action.payload;
        } else {
            return state;
        }
    },
    defaultState
);