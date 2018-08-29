import hash from 'object-hash'
import { createAction } from 'redux-actions';

import firedb from '../api/firebase';

export const BRANDS_FETCH = 'BRANDS_FETCH';
export const fetchBrandsAction = createAction(BRANDS_FETCH);

export const FUELTYPES_FETCH = 'FUELTYPES_FETCH';
export const fetchFueltypesAction = createAction(FUELTYPES_FETCH);

export const SYNCHRONISE = 'SYNCHRONISE';
export const synchroniseAction = createAction(SYNCHRONISE);

export function fetchBrands() {
    return (dispatch) => {
        dispatch(fetchBrandsAction());
        firedb.fetchBrands()
            .then((response) => {
                dispatch(fetchBrandsAction(response, { success: true }));
            })
            .catch((error) => {
                dispatch(fetchBrandsAction(error, { success: false }))
            });
    };
}

export function fetchFueltypes() {
    return (dispatch) => {
        dispatch(fetchFueltypesAction());
        firedb.fetchFueltypes()
            .then((response) => {
                dispatch(fetchFueltypesAction(response, { success: true }));
            })
            .catch((error) => {
                dispatch(fetchFueltypesAction(error, { success: false }))
            });
    };
}