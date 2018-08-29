import { has } from 'lodash';
import { handleAction } from 'redux-actions';

import { BRANDS_SELECT } from '../../actions';

const defaultState = {};

export default handleAction(
    BRANDS_SELECT,
    (state, action) => {
        if (has(action, 'payload')) {
            return action.payload;
        } else {
            return state;
        }
    },
    defaultState
);