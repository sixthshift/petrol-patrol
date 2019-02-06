import { has, initial, isEqual, isNumber, isObject, map, tail, times, transform, zip } from 'lodash';
import objectHash from 'object-hash';
import stringify from 'json-stable-stringify';

/**
 * Generates an SHA1 hash from the input
 * 
 * @param {any} data The data to be hashed
 * @returns {string} The hash value of the input
 */
export const hash = (data) => {
    const serialisedData = stringify(data);
    return objectHash(serialisedData);
};

/**
 * Generates a series of equal intervals for a start-end boundary (inclusive)
 * 
 * @param {number} start The lower boundary of the interval range
 * @param {number} end The upper boundary of the interval range
 * @param {number} n The number of intervals to partition into
 * @returns {[number]} An array containing the intervals
 */
export const intervalise = (start, end, n) => {
    if (isNumber(start) && isNumber(end) && isNumber(n)) {
        const difference = end - start;
        const equalInterval = (difference / (n - 1));
        const intervals = times(n, (index) => {
            return start + (index * equalInterval);
        });
        return intervals;
    } else {
        return [];
    }
};

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
 * Deep diff between two objects
 * 
 * @param  {Object} object Object compared
 * @param  {Object} base Object to compare with
 * @return {Object} An object which represents the diff
 */
export const objectDiff = (object, base) => {
    function changes(object, base) {
        return transform(object, function (result, value, key) {
            if (!isEqual(value, base[key])) {
                result[key] = (isObject(value) && isObject(base[key])) ? changes(value, base[key]) : value;
            }
        });
    }
    return changes(object, base);
}

/**
 * Generates consecutive pairs of the input list
 * 
 * @param {[object]} arr The array to pair up
 * @returns {[object]} A new Array with paired values
 */
export const pairwise = (arr) => {
    const pairs = initial(zip(arr, tail(arr)));
    return map(pairs);
};