import { MapView, Svg } from 'expo';
import { get, isEqual, isNil, isNull, isUndefined, omit } from 'lodash';
import React from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import { addVisibleMarkerAction, fetchPrice, removeVisibleMarkerAction } from '../../actions';
import { getRegion, getSelectedBrands, getSelectedFueltype, getPrice, getMostRecentStatistics } from '../../selectors';
import { colour } from '../../utils';

const markerHeight = 36;
const markerWidth = 48;

class Marker extends React.Component {

    constructor(props) {
        super(props);
        this.markerProps = {
            coordinate: {
                latitude: props.station.location.latitude,
                longitude: props.station.location.longitude,
            },
            onPress: this.onPress.bind(this),
        };
    }

    componentDidMount() {
        this._update();
        this.props.addVisibleMarker(this.props.station.id);
    }

    componentWillUnmount() {
        this.props.removeVisibleMarker(this.props.station.id);
    }

    componentDidUpdate() {
        this._update();
    }

    onPress() {
        const props = {
            id: this.props.station.id,
        };
        this.props.navigation.navigate('details', props);
    }

    _update() {
        if (isUndefined(this.props.price)) {
            // If price is null, it means it is still fetching, don't fetch again
            this.props.fetchPrice(this.props.station, this.props.selectedFueltype);
        }
    }

    shouldComponentUpdate(nextProps) {
        const before = omit(this.props, ['selectedBrands', 'selectedFueltype', 'region']);
        const after = omit(nextProps, ['selectedBrands', 'selectedFueltype', 'region']);
        if (!isEqual(before, after)) {
            // // If price is being updated from undefined to null, don't re-render
            return !isNull(get(after, 'price'));
        } else {
            return false;
        }
    }

    render() {
        return (
            <MapView.Marker {...this.markerProps}>
                <Svg
                    height={markerHeight}
                    width={markerWidth}
                >
                    <Svg.Path
                        d="M4,4 L44,4 L44,24 C28,24 28,24 24,32 C20,24 20,24 4,24 z"
                        fill="white"
                        stroke={colour(this.props.price, this.props.statistics)}
                        strokeWidth="2"
                    />
                    <Svg.Text
                        fill="black"
                        fontSize="10"
                        fontWeight="bold"
                        x={markerWidth / 2}
                        y={markerHeight / 2}
                        textAnchor="middle"
                    >
                        {isNil(this.props.price) ? 'N/A' : this.props.price.price}
                    </Svg.Text>
                </Svg>
            </MapView.Marker>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const fueltype = getSelectedFueltype(state);
    const station = get(ownProps, 'station');
    const props = { fueltype, station };
    return {
        price: getPrice(state, props),
        region: getRegion(state),
        selectedBrands: getSelectedBrands(state),
        selectedFueltype: fueltype,
        statistics: getMostRecentStatistics(state, { fueltype }),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPrice: (stationID, fueltype) => {
            dispatch(fetchPrice(stationID, fueltype));
        },
        addVisibleMarker: (stationID) => {
            dispatch(addVisibleMarkerAction(stationID))
        },
        removeVisibleMarker: (stationID) => {
            dispatch(removeVisibleMarkerAction(stationID))
        },
    };
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Marker));