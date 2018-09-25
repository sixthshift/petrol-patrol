import { has } from 'lodash';
import { handleAction } from 'redux-actions';

import { LOCATION_SET } from '../actions';
import defaultRegion from '../components/maps/defaultRegion';

const defaultState = defaultRegion;

export default handleAction(
    LOCATION_SET,
    (state, action) => {
        if (has(action, 'payload')) {
            return action.payload;
        } else {
            return state;
        }
    },
    defaultState
);