import fastHaversine from 'fast-haversine';
import { get, has, isNull, round } from 'lodash';

import gradiate from './gradient';

/**
 * Determines whether a given object is active or not,
 * if the 'active' property does not exist then it is assumed active
 * 
 * @param {object} object
 * @returns {boolean}
 */
export const isActive = (item) => {
    return has(item, 'active') && item.active;
};

/**
 * Calculates the colour gradient of a price based off the current statistics
 * 
 * @param {object} price The price to be gradiated
 * @param {object} statistics The statistics information required to calculate the colour gradient
 * @returns {string} The gradiated colour for the price
 */
export const colour = (price, statistics) => {
    const defaultColour = 'grey';
    if (isNull(price)) {
        return defaultColour;
    } else {
        const fueltype = price.fueltype;
        const statisticForFueltype = get(statistics, fueltype, null);
        if (isNull(statisticForFueltype)) {
            return defaultColour;
        } else {
            const stdev = statisticForFueltype.stdev;
            const mean = statisticForFueltype.mean;
            const lowerBound = mean - stdev * 2;
            const upperBound = mean + stdev * 2;
            return gradiate(lowerBound, upperBound, price.price);
        }
    }
};

/**
 * Calculates the distance between two geo-points
 * 
 * @param {object} from Geopoint
 * @param {object} to Geopoint
 * @returns {number} The distance between the two geopoints
 */
export const haversine = (from, to) => {
    if (isNull(from) || isNull(to)) {
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