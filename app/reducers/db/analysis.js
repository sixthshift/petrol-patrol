import { has } from 'lodash';
import { handleAction } from 'redux-actions';

import { ANALYSIS_FETCH } from '../../actions';

const defaultState = [];

export default handleAction(
    ANALYSIS_FETCH,
    (state, action) => {
        if (has(action, 'payload')) {
            return action.payload;
        } else {
            return state;
        }
    },
    defaultState
);