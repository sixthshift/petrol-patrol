import { first, last, map, size } from 'lodash';

import { now } from '../../utils';

const ratio = (arr) => {
    const range = last(arr) - first(arr);
    const equalInterval = range / size(arr);
    const proportion = [0];
    for (let i = 1; i < size(arr); i++) {
        proportion.push(arr[i] - arr[i - 1]);
    }
    const ratio = map(proportion, (magnitude) => (magnitude / equalInterval));
    return ratio;
};

export const accumulatedRatio = (arr) => {
    const ratios = ratio([...arr, now().unix()]);
    let cumulativeSum = 0;
    const accumulatedRatio = map(ratios, (ratio) => {
        cumulativeSum += ratio;
        return cumulativeSum;
    });
    return accumulatedRatio;
};