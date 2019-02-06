import { ceil, floor } from 'lodash';
import moment from 'moment';

/**
 * Rounds down a given moment object to the nearest interval in time
 * 
 * @param {moment} time Moment object to be rounded
 * @param {number} interval The interval in minutes to round the moment object down to
 * @returns {moment} A moment object rounded down to the nearest interval
 */
export const floorTo = (time, interval) => {
    const minute = floor(time.minutes() / interval) * interval;
    return time.clone().minutes(minute).seconds(0).milliseconds(0);
};

/**
 * Rounds up a given moment object to the nearest interval in time
 * @param {moment} time Moment object to be rounded
 * @param {number} interval The interval in minutes to round the moment object up to
 * @returns {moment} A moment object rounded up to the nearest interval
 */
export const ceilTo = (time, interval) => {
    const minute = ceil(time.minutes() / interval) * interval;
    return time.clone().minutes(minute).seconds(0).milliseconds(0);
};

/**
 * Fetches a moment object representing current time
 *
 * @returns {moment} A moment object representing current time
 */
export const now = () => {
    return moment();
}