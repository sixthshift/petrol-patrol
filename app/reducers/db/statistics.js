import { has, sortedIndexBy, slice, some } from 'lodash';
import { handleAction } from 'redux-actions';

import { STATISTICS_FETCH } from '../../actions';

const defaultState = [];

export default handleAction(
    STATISTICS_FETCH,
    (state, action) => {
        if (has(action, 'payload')) {
            if (some(state, { timestamp: action.payload.timestamp })) {
                return state;
            } else {
                const index = sortedIndexBy(state, action.payload, 'timestamp');
                return [...slice(state, 0, index), action.payload, ...slice(state, index)];
            }
        } else {
            return state;
        }
    },
    defaultState
);