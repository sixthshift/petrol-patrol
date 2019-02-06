import { has } from 'lodash';
import { handleAction } from 'redux-actions';

import { REGION_SET } from '../../actions';
import { defaultRegion } from '../../constants/maps';

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