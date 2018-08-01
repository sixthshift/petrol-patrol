import firebase from 'firebase';
import Geofire from 'geofire';
import { has, sortBy } from 'lodash';

import constants from './constants';

export default class FireDB {

    constructor(credentials) {
        if (validCredentials(credentials)) {
            firebase.initializeApp(credentials);
            this.database = firebase.database();
            this.geofire = new Geofire(this.database.ref(constants.table.stations));
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
     * Fetches the list of brands stored in the Firebase Database
     * 
     * @returns {[object]} The list of brands
     */
    async fetchBrands() {
        const snapshot = await this.database.ref(constants.table.brands).once('value');
        const brands = snapshot.val();
        return sortBy(brands, 'order');
    }

    /**
     * Fetches the list of fueltypes store in the Firebase Database
     * 
     * @returns {[object]} The list of fueltypes
     */
    async fetchFuelTypes() {
        const snapshot = await this.database.ref(constants.table.fueltypes).once('value');
        const fueltypes = snapshot.val();
        return sortBy(fueltypes, 'order');
    }

    /**
     * Fetches a station object by its id from the Firebase Database
     * 
     * @param {number} id The id of the station
     * @returns {object} The station object
     */
    async fetchStation(id) {
        const snapshot = await this.database.ref(constants.table.stations).ref(id).once('value');
        const station = snapshot.val();
        return station;
    }

    /**
     * Fetches a list of stations within proximity to the given latitude, longitude and radius
     * 
     * @param {number} latitude The latitude of the query point
     * @param {number} longitude The longitude of the query point
     * @param {number} radius The radius in km of the query point
     * @returns {[object]} A list of all of the stations that satisfy the geo-query
     */
    async fetchStationsByProximity(latitude, longitude, radius) {
        const snapshot = [];
        const geoQuery = this.geofire.query({
            center: [latitude, longitude],
            radius: radius,
        });

        // Register callback for each key within the geoQuery
        // Each callback result collects into the resultset
        geoQuery.on('key_entered', (key, location, distance) => {
            snapshot.push(key);
        });

        // The ready callback will fire once all of the key_entered callbacks have executed
        return await geoQuery.on('ready').then(() => {
            geoQuery.cancel();
            return snapshot;
        });
    }

    /**
     * Fetches a list of the current prices for a given station
     * 
     * @param {number} id The id of the station
     * @returns {[object]} A list of prices associated with the given station
     */
    async fetchPricesForStation(id) {
        const snapshot = await this.database.ref(constants.table.prices).orderByChild('id').equalTo(id);
        const prices = snapshot.val();
        return prices;
    }

    /**
     * Fetches a list of historical prices for a given station and fueltype
     * 
     * @param {number} id The id of the station
     * @param {string} fueltype The fueltype to query
     * @returns {[object]} A list of historical prices for the given station and fueltype
     */
    async fetchPriceHistoryForStation(id, fueltype) {

    }

}