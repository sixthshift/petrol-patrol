import firebase from 'firebase';
import { has, isNull, sortBy, values } from 'lodash';

import { table } from './constants';

export default class FireDB {

    constructor(credentials) {
        if (FireDB.validCredentials(credentials)) {
            firebase.initializeApp(credentials);
            this.auth = firebase.auth();
            if (!this.auth.currentUser) {
                this.auth.signInAnonymously();
            }
            this.database = firebase.database();
        } else {
            throw new TypeError('Invalid credentials');
        }
    }

    /**
     * Checks whether the given credentials have the correct properties.
     * Does not check whether the credentials will successfully initialise
     * 
     * @param {object} credentials The credentials to check
     * @returns {boolean} The validity of the credentials
     */
    static validCredentials(credentials) {
        return has(credentials, 'apiKey')
            && has(credentials, 'authDomain')
            && has(credentials, 'databaseURL')
            && has(credentials, 'storageBucket');
    }

    /**
     * Fetches the latest analysis stored in the Firebase Database
     * 
     * @returns {object} The analysis data
     * 
     */
    async fetchAnalysis() {
        const snapshot = await this.database.ref(table.analysis).limitToLast(1).once('value');
        const analysis = snapshot.val();
        return values(analysis);
    }

    /**
     * Fetches the list of brands stored in the Firebase Database
     * 
     * @returns {[object]} The list of brands
     */
    async fetchBrands() {
        const snapshot = await this.database.ref(table.brands).once('value');
        const brands = snapshot.val();
        return values(sortBy(brands, 'order'));
    }

    /**
     * Fetches the list of fueltypes stored in the Firebase Database
     * 
     * @returns {[object]} The list of fueltypes
     */
    async fetchFueltypes() {
        const snapshot = await this.database.ref(table.fueltypes).once('value');
        const fueltypes = snapshot.val();
        return values(sortBy(fueltypes, 'order'));
    }

    /**
     * Fetches the list of hashes for the collections in the Firebase Database
     * 
     * @returns {[object]} The list of hash values associated with collections in the Firebase Database
     */
    async fetchHash() {
        const snapshot = await this.database.ref(table.hash).once('value');
        const hash = snapshot.val();
        return hash;
    }

    /**
     * 
     * @param {string} hashID The hash key identifying the price data point
     * @returns {object} The latest price associated with the given hash
     */
    async fetchPrice(hashID) {
        const path = table.prices + '/' + hashID;
        const snapshot = await this.database.ref(path).orderByKey().limitToLast(1).once('value');
        const price = snapshot.val();
        if (isNull(price)) {
            return null;
        } else {
            return values(price);
        }
    }

    /**
     * Fetches a list of historical prices for a given station and fueltype
     * 
     * @param {string} hashID The hash key identifying the price data point
     * @param {number} timestamp The timestamp to fetch prices after
     * @returns {[object]} A list of historical prices for the given station and fueltype
     */
    async fetchPriceHistory(hashID, timestamp) {
        const path = table.prices + '/' + hashID;
        const snapshot = await this.database.ref(path).orderByChild('time').startAt(timestamp).once('value');
        const history = snapshot.val();
        if (isNull(history)) {
            return null;
        } else {
            return values(history);
        }
    }

    /**
     * Fetches a station object by its id from the Firebase Database
     * 
     * @param {number} id The id of the station
     * @returns {object} The station object
     */
    async fetchStation(id) {
        const path = table.stations + '/' + id;
        const snapshot = await this.database.ref(path).once('value');
        const station = snapshot.val();
        return station;
    }

    /**
     * Fetches the list of stations stored in the Firebase Database
     * 
     * @returns {[object]} The list of stations
     */
    async fetchStations() {
        const snapshot = this.database.ref(table.stations).orderByChild('active').equalTo(true).once('value');
        const awaitedsnapshot = await snapshot;
        const stations = awaitedsnapshot.val();
        return values(sortBy(stations, 'id'));
    }

    /**
     * Fetches statistics at a given timestamp
     * 
     * @param {number} timestamp The unix timestamp to fetch from in seconds
     */
    async fetchStatistic(timestamp) {
        const path = table.statistics + '/' + timestamp;
        const snapshot = await this.database.ref(path).once('value');
        const statistic = snapshot.val();
        return statistic;
    }

    /**
     * Fetches the n most recent statistics values stored in the Firebase Database
     * 
     * @param {number} n The number of most recent data points to query
     */
    async fetchStatistics(n = 1) {
        const snapshot = await this.database.ref(table.statistics).limitToLast(n).once('value');
        const statistics = snapshot.val();
        return values(statistics);
    }
}