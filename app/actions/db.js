import { first, get, isNull, map, times } from 'lodash';
import { createAction } from 'redux-actions';

import { syncFrequency } from '../constants/app';
import firedb from '../api/firebase';
import { selectAllBrandsAction, selectFueltypeAction } from './ui';
import { hash, now, previousInterval } from '../utils';

export const ANALYSIS_FETCH = 'ANALYSIS_FETCH';
export const fetchAnalysisAction = createAction(ANALYSIS_FETCH);

export const BRANDS_FETCH = 'BRANDS_FETCH';
export const fetchBrandsAction = createAction(BRANDS_FETCH);

export const FUELTYPES_FETCH = 'FUELTYPES_FETCH';
export const fetchFueltypesAction = createAction(FUELTYPES_FETCH);

export const PRICE_FETCH = 'PRICE_FETCH';
export const fetchPriceAction = createAction(PRICE_FETCH, (payload) => (get(payload, 'payload')), (payload) => (get(payload, 'meta')));

export const STATIONS_FETCH = 'STATIONS_FETCH';
export const fetchStationsAction = createAction(STATIONS_FETCH);

export const STATISTICS_FETCH = 'STATISTICS_FETCH';
export const fetchStatisticsAction = createAction(STATISTICS_FETCH);

export function fetchAnalysis() {
    return (dispatch) => {
        firedb.fetchAnalysis()
            .then((response) => {
                dispatch(fetchAnalysisAction(response, { success: true }));
            })
            .catch((error) => {
                dispatch(fetchAnalysisAction(error, { success: false }));
            });
    };
}

export function fetchBrands() {
    return (dispatch) => {
        firedb.fetchBrands()
            .then((response) => {
                dispatch(fetchBrandsAction(response, { success: true }));
                dispatch(selectAllBrandsAction(map(response, 'name')));
            })
            .catch((error) => {
                dispatch(fetchBrandsAction(error, { success: false }));
            });
    };
}

export function fetchFueltypes() {
    return (dispatch) => {
        firedb.fetchFueltypes()
            .then((response) => {
                dispatch(fetchFueltypesAction(response, { success: true }));
                dispatch(selectFueltypeAction(first(map(response, 'code'))));
            })
            .catch((error) => {
                dispatch(fetchFueltypesAction(error, { success: false }));
            });
    };
}

export function fetchPrice(station, fueltype) {
    return (dispatch) => {
        const key = {
            id: station.id,
            fueltype: fueltype,
        };
        const hashID = hash(key);
        const payload = {
            payload: [],
            meta: { hash: hashID, success: null }
        };
        dispatch(fetchPriceAction(payload));
        firedb.fetchPrice(hashID)
            .then((response) => {
                const payload = {
                    payload: response,
                    meta: { hash: hashID, success: true }
                };
                dispatch(fetchPriceAction(payload));
            })
            .catch((error) => {
                const payload = {
                    payload: error,
                    meta: { hash: hashID, success: false }
                };
                dispatch(fetchPriceAction(payload));
            });
    };
}

export function fetchPriceHistory(station, fueltype, timestamp) {
    return (dispatch) => {
        const key = {
            id: station.id,
            fueltype: fueltype,
        };
        const hashID = hash(key);
        const payload = {
            payload: [],
            meta: { hash: hashID, success: null }
        };
        dispatch(fetchPriceAction(payload));
        firedb.fetchPriceHistory(hashID, timestamp)
            .then((response) => {
                if (!isNull(response)) {
                    const payload = {
                        payload: response,
                        meta: { hash: hashID, success: true }
                    };
                    dispatch(fetchPriceAction(payload));
                } else {
                    // Refetch the most recent price
                    dispatch(fetchPrice(station, fueltype))
                }
            })
            .catch((error) => {
                const payload = {
                    payload: error,
                    meta: { hash: hashID, success: false }
                };
                dispatch(fetchPriceAction(payload));
            });
    };
}

export function fetchStations() {
    return (dispatch) => {
        firedb.fetchStations()
            .then((response) => {
                dispatch(fetchStationsAction(response, { success: true }));
            })
            .catch((error) => {
                dispatch(fetchStationsAction(error, { success: false }));
            });
    }
}

export function fetchMostRecentStatistic(interval, retry = 3) {
    return (dispatch) => {
        firedb.fetchStatistic(interval)
            .then((response) => {
                dispatch(fetchStatisticsAction(response, { success: true }));
            })
            .catch(() => {
                // Current interval does not yet exist, fetch the next previous interval
                const previous = previousInterval(interval, syncFrequency);
                if (retry != 0) {
                    dispatch(fetchMostRecentStatistic(previous, retry - 1));
                }
            });
    };
}

export function fetchStatisticsByDay(n = 1) {
    return (dispatch) => {
        const today = now().startOf('day');

        const intervals = times(n, (i) => {
            return today.clone().subtract(i + 1, 'day');
        });

        map(intervals, (interval) => {
            firedb.fetchStatistic(interval)
                .then((response) => {
                    dispatch(fetchStatisticsAction(response, { success: true }));
                })
                .catch((error) => {
                    dispatch(fetchStatisticsAction(error, { success: false }));
                });
        });
    };
}