import { table } from './constants';
import firebase from 'firebase';
import Geofire, { distance } from 'geofire';
import { has, sortBy, values } from 'lodash';
import hash from 'object-hash';

export default class FireDB {

    constructor(credentials) {
        if (FireDB.validCredentials(credentials)) {
            firebase.initializeApp(credentials);
            this.auth = firebase.auth();
            if (!this.auth.currentUser) {
                this.auth.signInAnonymously();
            }
            this.database = firebase.database();
            this.geofire = new Geofire(this.database.ref(table.stations));
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
     * Creates a geoquery object initialised with the given region
     * 
     * @param {object} region The current region 
     * @returns {object} The GeoQuery object
     */
    createGeoQuery(region) {
        const latitude = region.latitude;
        const longitude = region.longitude;
        const radius = distance(
            [latitude, longitude],
            [latitude + region.latitudeDelta, longitude + region.longitudeDelta]
        );
        const geoQuery = this.geofire.query({
            center: [latitude, longitude],
            radius: radius
        });
        return geoQuery;
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
     * Fetches a list of the current prices for a given station
     * 
     * @param {number} id The id of the station
     * @returns {[object]} A list of prices associated with the given station
     */
    async fetchPricesByFueltypeAndStation(id, selectedFueltype) {
        const key = {
            id: id,
            fueltype: selectedFueltype,
        };
        const hashID = hash(key, { unorderedArrays: true });
        const path = table.prices + '/' + hashID;
        const snapshot = await this.database.ref(path).once('value');
        const price = snapshot.val();
        return price;
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
        const snapshot = await this.database.ref(table.stations).orderByChild('active').equalTo(true).once('value');
        const stations = snapshot.val();
        return values(sortBy(stations, 'id'));
    }

    /**
     * Updates a geoquery with the new region
     * 
     * @param {object} geoQuery The geoquery to be updated
     * @param {object} region The region to update the geoquery to
     */
    updateGeoQuery(geoQuery, region) {
        const latitude = region.latitude;
        const longitude = region.longitude;
        if (region.latitudeDelta !== undefined && region.longitudeDelta !== undefined) {
            const radius = distance(
                [latitude, longitude],
                [latitude + region.latitudeDelta, longitude + region.longitudeDelta]
            );
            geoQuery.updateCriteria({
                center: [latitude, longitude],
                radius: radius
            });
        }
    }
}