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