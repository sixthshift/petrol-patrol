import fastHaversine from 'fast-haversine';
import { isNil, maxBy, mean, minBy, round } from 'lodash';

/**
 * Generates a region object that encompasses all of the stations given
 * 
 * @param {[object]} stations A list of station objects
 * @returns {object} The region object that encompasses all of the stations given
 */
export const encompassingRegion = (stations) => {
    const latitudeMax = maxBy(stations, 'location.latitude').location.latitude;
    const latitudeMin = minBy(stations, 'location.latitude').location.latitude;
    const latitude = mean([latitudeMax, latitudeMin]);
    const latitudeDelta = (latitudeMax - latitudeMin) / 2;

    const longitudeMax = maxBy(stations, 'location.longitude').location.longitude;
    const longitudeMin = minBy(stations, 'location.longitude').location.longitude;
    const longitude = mean([longitudeMax, longitudeMin]);
    const longitudeDelta = (longitudeMax - longitudeMin) / 2;

    return {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
    };
};

/**
 * Calculates the distance between two geo-points
 * 
 * @param {object} from Geopoint
 * @param {object} to Geopoint
 * @returns {number} The distance between the two geopoints
 */
export const haversine = (from, to) => {
    if (isNil(from) || isNil(to)) {
        return null;
    }
    if (isNil(from.latitude) || isNil(from.longitude)) {
        return null;
    }
    if (isNil(to.latitude) || isNil(to.longitude)) {
        return null;
    }
    from = {
        lat: from.latitude,
        lon: from.longitude,
    };
    to = {
        lat: to.latitude,
        lon: to.longitude,
    };
    const distanceInMetres = fastHaversine(from, to);
    if (distanceInMetres >= 1000) {
        // If distance is > 1 km, display to nearest 0.1 km
        return round((distanceInMetres / 1000), 1) + ' km';
    } else {
        // Otherwise display to nearest 10 m
        return round(distanceInMetres, -1) + ' m';
    }
};