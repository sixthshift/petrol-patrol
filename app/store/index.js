import hash from 'object-hash'
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';

import { fetchBrands, fetchFueltypes } from '../actions';
import firedb from '../api/firebase';
import reducer from '../reducers';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['location'],
};

const rootReducer = persistReducer(persistConfig, reducer);

export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(
            thunk
        )
    )
);

const sync = () => {
    const brands = store.getState().db.brands;
    const fueltypes = store.getState().db.fueltypes;
    firedb.fetchHash()
        .then((response) => {
            const brandsHash = hash(brands, { unorderedArrays: true });
            const fetchedBrandsHash = response.brands.hash;
            if (brandsHash != fetchedBrandsHash) {
                store.dispatch(fetchBrands());
            }
            const fetchedFueltypeshash = response.fueltypes.hash;
            const fueltypesHash = hash(fueltypes, { unorderedArrays: true });
            if (fueltypesHash != fetchedFueltypeshash) {
                store.dispatch(fetchFueltypes());
            }
        });
};

export const persistor = persistStore(store, null, sync);