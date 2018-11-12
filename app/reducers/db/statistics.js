import { has, isEqual, unionWith } from 'lodash';
import { handleAction } from 'redux-actions';

import { STATISTICS_FETCH } from '../../actions';

const defaultState = [];

export default handleAction(
    STATISTICS_FETCH,
    (state, action) => {
        if (has(action, 'payload')) {
            return unionWith(state, action.payload, isEqual);
        } else {
            return state;
        }
    },
    defaultState
);