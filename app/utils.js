import { initial, map, tail, zip } from 'lodash';
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
 * Generates consecutive pairs of the input list
 * 
 * @param {[object]} arr The array to pair up
 * @returns {[object]} A new Array with paired values
 */
export const pairwise = (arr) => {
    const pairs = initial(zip(arr, tail(arr)));
    return map(pairs);
};