import { persistStore } from 'redux-persist';

import { fetchBrands, fetchFueltypes, fetchStations } from '../actions';
import firedb from '../api/firebase';
import store from './store';
import { hash } from './utils';

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

export default persistStore(store, null, sync);