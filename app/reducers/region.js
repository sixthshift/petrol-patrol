import { has } from 'lodash';
import { handleAction } from 'redux-actions';

import { REGION_SET } from '../actions';
import defaultRegion from '../components/maps/defaultRegion';

const defaultState = defaultRegion;

export default handleAction(
    REGION_SET,
    (state, action) => {
        if (has(action, 'payload')) {
            return action.payload;
        } else {
            return state;
        }
    },
    defaultState
);