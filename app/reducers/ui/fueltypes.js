import { has } from 'lodash';
import { handleAction } from 'redux-actions';

import { FUELTYPE_SELECT } from '../../actions';

const defaultState = {};

export default handleAction(
    FUELTYPE_SELECT,
    (state, action) => {
        if (has(action, 'payload')) {
            return action.payload;
        } else {
            return state;
        }
    },
    defaultState
);