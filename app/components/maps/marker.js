import { MapView, Svg } from 'expo';
import { get, isEqual, isNil, isNull, isUndefined, memoize, omit, once, reduce } from 'lodash';
import React from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import { addVisibleMarkerAction, fetchPrice, removeVisibleMarkerAction } from '../../actions';
import { markerBorder, markerHeight, markerWidth } from '../../constants/maps';
import { getRegion, getSelectedBrands, getSelectedFueltype, getPrice, getMostRecentStatistics } from '../../selectors';
import { colour } from '../../utils';

const draw = once((markerHeight, markerWidth) => {
    const offset = markerBorder;
    const tailProportion = 0.25;
    const tailCurve = 0.4;

    const height = (markerHeight - (2 * offset));
    const width = (markerWidth - (2 * offset));
    const points = [
        {
            x: offset,
            y: offset,
            a: 'M',
        },
        {
            x: width + offset,
            y: offset,
            a: 'L',
        },
        {
            x: width + offset,
            y: (1 - tailProportion) * height + offset,
            a: 'L',
        },
        {
            x: ((1 - tailCurve) * width) + offset,
            y: (1 - tailProportion) * height + offset,
            a: 'C',
        },
        {
            x: ((1 - tailCurve) * width) + offset,
            y: (1 - tailProportion) * height + offset,
        },
        {
            x: (width / 2) + offset,
            y: height + offset,
        },
        {
            x: (tailCurve * width) + offset,
            y: (1 - tailProportion) * height + offset,
            a: 'C',
        },
        {
            x: (tailCurve * width) + offset,
            y: (1 - tailProportion) * height + offset,
        },
        {
            x: offset,
            y: (1 - tailProportion) * height + offset,
        },
        {
            a: 'z',
        },
    ];
    return reduce(points, (acc, point) => (acc + ' ' + get(point, 'a', '') + get(point, 'x', '') + ',' + get(point, 'y', '')), '');
});

const centreTextPosition = memoize((length) => (length / 2), (length) => (length));

class Marker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tracksViewChanges: false,
        };
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
            this.setState({ tracksViewChanges: true });
        }
        else if (this.state.tracksViewChanges) {
            this.setState({ tracksViewChanges: false });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const beforeProps = omit(this.props, ['selectedBrands', 'selectedFueltype', 'region']);
        const afterProps = omit(nextProps, ['selectedBrands', 'selectedFueltype', 'region']);
        const beforeState = this.state;
        const afterState = nextState;
        if (!isEqual(beforeProps, afterProps) || beforeState != afterState) {
            // // If price is being updated from undefined to null, don't re-render
            return !isNull(get(afterProps, 'price'));
        } else {
            return false;
        }
    }

    render() {
        return (
            <MapView.Marker
                {...this.markerProps}
                tracksViewChanges={this.state.tracksViewChanges}
            >
                <Svg
                    height={markerHeight}
                    width={markerWidth}
                >
                    <Svg.Path
                        d={draw(markerHeight, markerWidth)}
                        fill="white"
                        stroke={colour(this.props.price, this.props.statistics)}
                        strokeWidth={markerBorder}
                    />
                    <Svg.Text
                        fill="black"
                        fontSize="15"
                        fontWeight="bold"
                        x={centreTextPosition(markerWidth)}
                        y={centreTextPosition(markerHeight)}
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