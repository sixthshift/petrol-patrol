import { MapView, Svg } from 'expo';
import _, { inRange } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import firedb from '../../api/firebase';

const markerHeight = 36;
const markerWidth = 48

class Marker extends React.Component {

    constructor(props) {
        super(props);
        this.isMounted = false;
        this.markerProps = {
            coordinate: {
                latitude: props.station.location.latitude,
                longitude: props.station.location.longitude,
            }
        };
        this.state = {
            colour: 'grey',
            data: null,
            visible: false,
        };
    }

    componentDidMount() {
        this.isMounted = true;
        this._update();
    }

    componentDidUpdate() {
        this._update();
    }

    componentWillUnmount() {
        this.isMounted = false;
    }

    _update() {
        if (!this.state.visible && this.withinRegion()) {
            firedb.fetchPricesByFueltypeAndStation(this.props.station.id, this.props.selectedFueltype)
                .then((price) => {
                    if (this.isMounted) {
                        const newState = {
                            data: price,
                            visible: true,
                        };
                        this.setState(newState);
                    }
                });
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
        if (this.state.visible) {
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
                        >{this.state.data.price}</Svg.Text>
                    </Svg>
                </MapView.Marker>
            );
        } else {
            return (null);
        }
    }
}

const mapStateToProps = (state) => {
    return {
        selectedBrands: state.ui.brands,
        selectedFueltype: state.ui.fueltype,
        region: state.region
    };
};

export default connect(mapStateToProps)(Marker);