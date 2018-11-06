import { has } from 'lodash';

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