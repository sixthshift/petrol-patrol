import { handleAction } from 'redux-actions';

import { BRANDS_SELECT } from '../../actions';

const defaultState = {};

export default handleAction(
    BRANDS_SELECT,
    (state, action) => ({
        ...state,
        brands: action.payload
    }),
    defaultState
);