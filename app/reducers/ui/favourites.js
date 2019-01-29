import { chain, difference, intersection, isArray } from 'lodash';
import { handleActions } from 'redux-actions';

import { FAVOURITES_REORDER, FAVOURITES_SELECT } from '../../actions';

const defaultState = {};

export default handleActions(
    {
        [FAVOURITES_SELECT]: (state, action) => {
            const payload = isArray(action.payload) ? action.payload : [action.payload];
            const toBeSelected = difference(payload, state);
            const toBeUnselected = intersection(payload, state);
            return chain(state).union(toBeSelected).difference(toBeUnselected).value();
        },
        [FAVOURITES_REORDER]: (state, action) => {
            const payload = isArray(action.payload) ? action.payload : [action.payload];
            return payload;
        },
    },
    defaultState
);