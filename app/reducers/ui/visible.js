import { difference, isArray, union } from 'lodash';
import { handleActions } from 'redux-actions';

import { VISIBLE_MARKER_ADD, VISIBLE_MARKER_REMOVE } from '../../actions';

const defaultState = [];

export default handleActions(
    {
        [VISIBLE_MARKER_ADD]: (state, action) => {
            const payload = isArray(action.payload) ? action.payload : [action.payload];
            return union(state, payload);

        },
        [VISIBLE_MARKER_REMOVE]: (state, action) => {
            const payload = isArray(action.payload) ? action.payload : [action.payload];
            return difference(state, payload);
        },
    },
    defaultState
);