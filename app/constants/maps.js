import { memoize } from 'lodash';
import { Dimensions } from 'react-native';

export const defaultRegion = {
    latitude: -33.8688,
    longitude: 151.2093,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
};

export const extent = 384;

export const markerBorder = 3;
export const markerHeight = 45;
export const markerWidth = 70;

export const mapEdgePadding = {
    bottom: 10,
    left: 10 + (markerWidth / 2),
    right: 10 + (markerWidth / 2),
    top: 10 + markerHeight,
};

export const radius = memoize(() => {
    const portion = 0.05; // portion of the screen
    const screenWidth = Dimensions.get('window').width;
    return screenWidth * portion;
});