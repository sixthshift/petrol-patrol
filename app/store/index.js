import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';

import reducer from '../reducers';
import { synchronise } from '../actions/db';

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

const initialise = () => {
    const brands = store.getState().db.brands;
    const fueltypes = store.getState().db.fueltypes;
    store.dispatch(synchronise(brands, fueltypes));
};

export const persistor = persistStore(store, null, initialise);