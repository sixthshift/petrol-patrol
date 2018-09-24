
import { differenceWith, isEqual } from 'lodash';
import { hash } from './utils';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { fetchBrands, fetchFueltypes, fetchStations } from '../actions';
import firedb from '../api/firebase';
import reducer from '../reducers';

const persistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['location'],
};

const rootReducer = persistReducer(persistConfig, reducer);

export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunk,
        logger
    )
);

const sync = () => {
    const brands = store.getState().db.brands;
    const fueltypes = store.getState().db.fueltypes;
    const stations = store.getState().db.stations;
    firedb.fetchHash()
        .then((response) => {
            const brandsHash = hash(brands);
            const fetchedBrandsHash = response.brands.hash;
            if (brandsHash != fetchedBrandsHash) {
                store.dispatch(fetchBrands());
            }
            const fueltypesHash = hash(fueltypes);
            const fetchedFueltypeshash = response.fueltypes.hash;
            if (fueltypesHash != fetchedFueltypeshash) {
                store.dispatch(fetchFueltypes());
            }
            const fetchedStationsHash = response.stations.hash;
            const stationsHash = hash(stations);
            if (stationsHash != fetchedStationsHash) {
                store.dispatch(fetchStations());
            }
        });
};

export const persistor = persistStore(store, null, sync);