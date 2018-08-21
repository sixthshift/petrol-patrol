import { createAction } from 'redux-actions';

import FireDB from '../api/firebase/firedb';
import FirebaseCredentials from '../api/firebase/credentials';

const firedb = new FireDB(FirebaseCredentials);

export const BRANDS_FETCH = 'BRANDS_FETCH';
export const fetchBrandsAction = createAction(BRANDS_FETCH);

export const FUELTYPES_FETCH = 'FUELTYPES_FETCH';
export const fetchFueltypesAction = createAction(FUELTYPES_FETCH);

export function fetchBrands() {
    return (dispatch) => {
        dispatch(fetchBrandsAction());

        firedb.fetchBrands()
            .then((response) => {
                dispatch(fetchBrandsAction(response));
            })
            .catch((error) => {
                dispatch(fetchBrandsAction(error, { error: true }))
            });
    };
}

export function fetchFueltypes() {
    return (dispatch) => {
        dispatch(fetchFueltypesAction());

        firedb.fetchFueltypes()
            .then((response) => {
                dispatch(fetchFueltypesAction(response));
            })
            .catch((error) => {
                dispatch(fetchFueltypesAction(error, { error: true }))
            });
    };
}
