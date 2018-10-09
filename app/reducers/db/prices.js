import { has } from 'lodash';
import { handleAction } from 'redux-actions';

import { PRICE_FETCH } from '../../actions';
import { hash } from '../../utils';

const defaultState = {};

export default handleAction(
    PRICE_FETCH,
    (state, action) => {
        if (has(action, 'payload')) {
            const key = {
                id: action.payload.id,
                fueltype: action.payload.fueltype,
            };
            const hashID = hash(key);
            return { ...state, [hashID]: action.payload };
        } else {
            return state;
        }
    },
    defaultState
);