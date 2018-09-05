import { has } from 'lodash';

export const isActive = (item) => {
    return has(item, 'active') && item.active;
};