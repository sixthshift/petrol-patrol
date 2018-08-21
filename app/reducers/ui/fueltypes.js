import { handleAction } from 'redux-actions';

import { FUELTYPE_SELECT } from '../../actions';

const defaultState = {};

export default handleAction(
    FUELTYPE_SELECT,
    (state, action) => ({
        ...state,
        brands: action.payload
    }),
    defaultState
);