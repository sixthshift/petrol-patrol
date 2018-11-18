import { isEqual, omit, unionWith } from 'lodash';
import { handleAction } from 'redux-actions';

import { PRICE_FETCH } from '../../actions';

const defaultState = {};

export default handleAction(
    PRICE_FETCH,
    (state, action) => {
        if (action.meta.success === true) {
            return {
                ...state,
                [action.meta.hash]: unionWith(state[action.meta.hash], action.payload, isEqual),
            };
        }
        else if (action.meta.success === false) {
            // Remove from store if there was an error so a retry may be possible
            return omit(state, action.meta.hash);
        } else {
            return {...state, [action.meta.hash]: []};
        }
    },
    defaultState
);