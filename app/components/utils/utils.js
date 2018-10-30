import { get, has, isNull } from 'lodash';

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