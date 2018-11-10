import { first, has, isArray, isEqual, merge, mergeWith, sortBy, unionWith } from 'lodash';
import { handleAction } from 'redux-actions';

import { PRICE_FETCH } from '../../actions';
import { hash } from '../../utils';

const defaultState = {};

const customiser = (objValue, srcValue) => {
    if (isArray(objValue)) {
        return unionWith(objValue, srcValue, isEqual);
    }
};

export default handleAction(
    PRICE_FETCH,
    (state, action) => {
        if (has(action, 'payload')) {
            const key = {
                id: first(action.payload).id,
                fueltype: first(action.payload).fueltype,
            };
            const hashID = hash(key);
            return mergeWith(merge({}, state), { [hashID]: action.payload }, customiser);
        } else {
            return state;
        }
    },
    defaultState
);