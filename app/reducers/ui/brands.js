import { chain, difference, intersection, isArray } from 'lodash';
import { handleAction } from 'redux-actions';

import { BRANDS_SELECT } from '../../actions';

const defaultState = {};

export default handleAction(
    BRANDS_SELECT,
    (state, action) => {
        const payload = isArray(action.payload) ? action.payload : [action.payload];
        const toBeSelected = difference(payload, state);
        const toBeUnselected = intersection(payload, state);
        return chain(state).union(toBeSelected).difference(toBeUnselected).value();
    },
    defaultState
);