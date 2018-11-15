import { has } from 'lodash';
import { handleAction } from 'redux-actions';

import { STATISTICS_FETCH } from '../../actions';

const defaultState = [];

export default handleAction(
    STATISTICS_FETCH,
    (state, action) => {
        if (has(action, 'payload')) {
            return action.payload;
        } else {
            return state;
        }
    },
    defaultState
);