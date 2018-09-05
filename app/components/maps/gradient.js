import { chain, join, mean, startsWith, tail } from 'lodash';

import colours from '../colours';

/**
 * Converts a hex colour value to its RGB components
 * 
 * @param {string} hex The hex colour value to be converted
 * @returns {object} An object containing the RGB components of the hex colour
 */
const hex2rgb = (hex) => {
    if (hex.startsWith('#')) {
        hex = chain(hex).tail().join('');
    }
    return {
        r: '0x' + hex[0] + hex[1] | 0,
        g: '0x' + hex[2] + hex[3] | 0,
        b: '0x' + hex[4] + hex[5] | 0,
    };
};

/**
 * Converts an RGB value to a hex colour value
 * 
 * @param {number} r The R component of RGB
 * @param {number} g The G component of RGB
 * @param {number} b The B component of RGB
 * @returns {string} The hex colour value
 */
const rgb2Hex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/**
 * Gradiates a gradiable on a red-yellow-green colour gradient
 * 
 * @param {*} min The lower bound interval
 * @param {*} max The upper bound interval
 * @param {*} gradiable The value to be gradiated
 * @returns {string} The colour gradiated by the gradiable within the range
 */
export default function gradiate(min, max, gradiable) {
    if (gradiable < min || gradiable > max) {
        throw new RangeError('gradiable must be between the min/max range');
    }

    const lowRGB = hex2rgb(colours.low);
    const midRGB = hex2rgb(colours.mid);
    const highRGB = hex2rgb(colours.high);

    const mid = mean([min, max]);
    if (gradiable < mid) {
        const ratio = (price - min) / mid;
        const r = lowRGB.r * ratio + midRGB.r * (1 - ratio);
        const g = lowRGB.g * ratio + midRGB.g * (1 - ratio);
        const b = lowRGB.b * ratio + midRGB.b * (1 - ratio);
    } else {
        const ratio = (price - mid) / max;
        const r = midRGB.r * (1 - ratio) + highRGB.r * ratio;
        const g = midRGB.g * (1 - ratio) + highRGB.g * ratio;
        const b = midRGB.b * (1 - ratio) + highRGB.b * ratio;
    }
    return rgb2Hex(r, g, b);
}