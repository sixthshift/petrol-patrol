import objectHash from 'object-hash';

/**
 * Generates an SHA1 hash from the input
 * 
 * @param {any} data The data to be hashed
 * @returns {string} The hash value of the input
 */
export const hash = (data) => {
    return objectHash(data, { unorderedArrays: true, unorderedObjects: true });
};