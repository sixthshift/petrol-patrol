import hash from 'object-hash'
import { createAction } from 'redux-actions';

import FireDB from '../api/firebase/firedb';
import FirebaseCredentials from '../api/firebase/credentials';

const firedb = new FireDB(FirebaseCredentials);

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

export function synchronise(brands, fueltypes) {
    return (dispatch) => {
        dispatch(synchroniseAction());
        firedb.fetchHash()
            .then((response) => {
                const brandsHash = hash(brands, { unorderedArrays: true });
                const fetchedBrandsHash = response.brands.hash;
                if (brandsHash != fetchedBrandsHash) {
                    dispatch(fetchBrands());
                }
                const fetchedFueltypeshash = response.fueltypes.hash;
                const fueltypesHash = hash(fueltypes, { unorderedArrays: true });
                if (fueltypesHash != fetchedFueltypeshash) {
                    dispatch(fetchFueltypes());
                }
                dispatch(synchroniseAction(null, { success: true }));
            })
            .catch((error) => {
                dispatch(synchroniseAction(error, { success: false }))
            });
    };
}