import { ceil, floor } from 'lodash';
import moment from 'moment';

/**
 * Rounds up a given moment object to the nearest interval in time
 * 
 * @param {moment} time Moment object to be rounded
 * @param {number} interval The interval in minutes to round the moment object up to
 * @returns {moment} A moment object rounded up to the nearest interval
 */
export const ceilTo = (time, interval) => {
    const minute = ceil(time.minutes() / interval) * interval;
    return time.clone().minutes(minute).seconds(0).milliseconds(0);
};

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
 * Fetches a moment object representing current time
 *
 * @returns {moment} A moment object representing current time
 */
export const now = () => {
    return moment();
}

/**
 * Moves a moment object back in time by 'interval' minutes
 * 
 * @param {moment} time Moment object to be moved back
 * @param {number} interval The interval in minutes to move back by
 * @returns {moment} A moment object that has be moved back by 'interval' minutes
 */
export const previousInterval = (time, interval) => {
    return time.clone().subtract(interval, 'minute');
};