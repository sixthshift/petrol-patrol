import { chain, difference, intersection, isArray } from 'lodash';
import { handleActions } from 'redux-actions';

import { BRANDS_ALL, BRANDS_NONE, BRANDS_SELECT } from '../../actions';

const defaultState = [];

export default handleActions(
    {
        [BRANDS_ALL]: (_, action) => {
            return action.payload;
        },
        [BRANDS_NONE]: () => {
            return defaultState;
        },
        [BRANDS_SELECT]: (state, action) => {
            const payload = isArray(action.payload) ? action.payload : [action.payload];
            const toBeSelected = difference(payload, state);
            const toBeUnselected = intersection(payload, state);
            return chain(state).union(toBeSelected).difference(toBeUnselected).value();
        }
    },
    defaultState
);