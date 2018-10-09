import { MapView, Svg } from 'expo';
import _, { inRange, isNull } from 'lodash';
import { Spinner } from 'native-base';
import { hash } from '../../utils';
import React from 'react';
import { connect } from 'react-redux';

import { fetchPrice } from '../../actions/db';

const markerHeight = 36;
const markerWidth = 48

class Marker extends React.Component {

    constructor(props) {
        super(props);
        this.markerProps = {
            coordinate: {
                latitude: props.station.location.latitude,
                longitude: props.station.location.longitude,
            }
        };
        this.state = {
            colour: 'grey',
        };
    }

    componentDidMount() {
        this._update();
    }

    componentDidUpdate() {
        this._update();
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
        return (
            <MapView.Marker {...this.markerProps}>
                <Svg
                    height={markerHeight}
                    width={markerWidth}
                >
                    <Svg.Path
                        d="M4,4 L44,4 L44,24 C28,24 28,24 24,32 C20,24 20,24 4,24 z"
                        fill="white"
                        stroke={this.state.colour}
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
    }
}

const mapStateToProps = (state, ownProps) => {
    const key = {
        id: ownProps.station.id,
        fueltype: state.ui.fueltype,
    };
    const hashID = hash(key);
    return {
        price: state.db.prices[hashID] ? state.db.prices[hashID] : null,
        region: state.region,
        selectedBrands: state.ui.brands,
        selectedFueltype: state.ui.fueltype,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPrice: (stationID, fueltype) => {
            dispatch(fetchPrice(stationID, fueltype))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Marker);