import { ToastAndroid } from 'react-native';
import { persistStore } from 'redux-persist';

import { fetchAnalysis, fetchBrands, fetchFueltypes, fetchStations, fetchMostRecentStatistic } from '../actions';
import { fetchingAnalysis, fetchingBrands, fetchingFueltype, fetchingStation } from '../components/strings';
import { enableAnalysisNRMA, syncFrequency } from '../constants/app';
import firedb from '../api/firebase';
import store from './store';
import { floorTo, hash, now, previousInterval } from '../utils';

const sync = () => {
    const analysis = store.getState().db.analysis;
    const brands = store.getState().db.brands;
    const fueltypes = store.getState().db.fueltypes;
    const stations = store.getState().db.stations;
    firedb.fetchHash()
        .then((response) => {
            if (enableAnalysisNRMA) {
                const analysisHash = hash(analysis);
                const fetchedAnalysisHash = response.analysis.hash;
                if (analysisHash != fetchedAnalysisHash) {
                    store.dispatch(fetchAnalysis());
                    ToastAndroid.show(fetchingAnalysis, ToastAndroid.LONG);
                }
            }
            const brandsHash = hash(brands);
            const fetchedBrandsHash = response.brands.hash;
            if (brandsHash != fetchedBrandsHash) {
                store.dispatch(fetchBrands());
                ToastAndroid.show(fetchingBrands, ToastAndroid.LONG);
            }
            const fueltypesHash = hash(fueltypes);
            const fetchedFueltypeshash = response.fueltypes.hash;
            if (fueltypesHash != fetchedFueltypeshash) {
                store.dispatch(fetchFueltypes());
                ToastAndroid.show(fetchingFueltype, ToastAndroid.LONG);
            }
            const fetchedStationsHash = response.stations.hash;
            const stationsHash = hash(stations);
            if (stationsHash != fetchedStationsHash) {
                store.dispatch(fetchStations());
                ToastAndroid.show(fetchingStation, ToastAndroid.LONG);
            }
        });
    const interval = floorTo(now(), syncFrequency);
    const previous = previousInterval(interval, syncFrequency);
    store.dispatch(fetchMostRecentStatistic(previous));
};

const persistor = persistStore(store, null, sync);
export default persistor;