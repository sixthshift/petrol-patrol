import { MapView, Svg } from 'expo';
import _, { inRange } from 'lodash';
import React from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import { fetchPrice } from '../../actions/db';
import gradiate from '../utils/gradient';
import { getRegion, getSelectedBrands, getSelectedFueltype, getPrice, getMostRecentStatistics } from '../../selectors';
import { colour } from '../utils';

const markerHeight = 36;
const markerWidth = 48

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

    shouldComponentUpdate(nextProps, nextState) {
        return (this.props !== nextProps || this.state !== nextState);
    }

    _update() {
        if (_(this.props.price).isNull() && this.withinRegion()) {
            this.props.fetchPrice(this.props.station, this.props.selectedFueltype);
        }
    }

    withinRegion() {
        const markerLatitude = this.props.station.location.latitude;
        const latitudeLowerBound = this.props.region.latitude - this.props.region.latitudeDelta;
        const latitudeUpperBound = this.props.region.latitude + this.props.region.latitudeDelta;
        const withinLatitude = inRange(markerLatitude, latitudeLowerBound, latitudeUpperBound);

        const markerLongitude = this.props.station.location.longitude;
        const longitudeLowerBound = this.props.region.longitude - this.props.region.longitudeDelta;
        const longitudeUpperBound = this.props.region.longitude + this.props.region.longitudeDelta;
        const withinLongitude = inRange(markerLongitude, longitudeLowerBound, longitudeUpperBound);

        return withinLatitude && withinLongitude;
    }

    render() {
        if (_(this.props.selectedBrands).includes(this.props.station.brand)) {
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
                        >{this.props.price == null ? 'N/A' : this.props.price.price}</Svg.Text>
                    </Svg>
                </MapView.Marker>
            );
        } else {
            return (null);
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const props = { ...ownProps, fueltype: getSelectedFueltype(state) };
    return {
        price: getPrice(state, props),
        region: getRegion(state),
        selectedBrands: getSelectedBrands(state),
        selectedFueltype: getSelectedFueltype(state),
        statistics: getMostRecentStatistics(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPrice: (stationID, fueltype) => {
            dispatch(fetchPrice(stationID, fueltype))
        }
    };
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Marker));