import { Entypo, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import PropTypes from 'prop-types';

import Colours from './Colours';

const defaultSize = 25;
const defaultColor = Colours.primary;

const BrandsIcon = ({ tintColor = defaultColor, size = defaultSize }) => {
    return <MaterialIcons name={"local-gas-station"} size={size} color={tintColor} />;
}

BrandsIcon.propTypes = {
    tintColor: PropTypes.string,
    size: PropTypes.number,
}

const FavouritesIcon = ({ tintColor = defaultColor, size = defaultSize }) => {
    return <MaterialIcons name={'favorite'} size={size} color={tintColor} />;
}

FavouritesIcon.propTypes = {
    tintColor: PropTypes.string,
    size: PropTypes.number,
}

const FuelIcon = ({ tintColor = defaultColor, size = defaultSize }) => {
    return <Entypo name={"drop"} size={size} color={tintColor} />;
}

FuelIcon.propTypes = {
    tintColor: PropTypes.string,
    size: PropTypes.number,
}

const InfoIcon = ({ tintColor = defaultColor, size = defaultSize }) => {
    return <MaterialIcons name={'info'} size={size} color={tintColor} />;
}

InfoIcon.propTypes = {
    tintColor: PropTypes.string,
    size: PropTypes.number,
}

const MainIcon = ({ tintColor = defaultColor, size = defaultSize }) => {
    return <MaterialIcons name={'home'} size={size} color={tintColor} />;
}

MainIcon.propTypes = {
    tintColor: PropTypes.string,
    size: PropTypes.number,
}

export { BrandsIcon, FavouritesIcon, FuelIcon, InfoIcon, MainIcon };