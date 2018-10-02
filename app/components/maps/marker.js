import { MapView, Svg } from 'expo';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import firedb from '../../api/firebase';

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
            price: 'N/A',
        };
    }

    componentDidMount() {
        this.update();
    }

    componentDidUpdate() {
        this.update();
    }

    update() {
        if (this.withinRegion()) {
            firedb.fetchPricesByFueltypeAndStation(this.props.station.id, this.props.selectedFueltype)
                .then((response) => {
                    const newState = {
                        price: response,
                    };
                    this.setState(newState);
                });
        }
    }

    withinRegion() {
        const withinLatitude = this.props.station.latitude < this.props.region.latitude - this.props.region.latitudeDelta
            && this.props.station.latitude > this.props.region.latitude + this.props.region.latitudeDelta;
        const withinLongitude = this.props.station.longitude < this.props.region.longitude - this.props.region.longitudeDelta
            && this.props.station.longitude > this.props.region.longitude + this.props.region.longitudeDelta;
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
                    >{this.state.price}</Svg.Text>
                </Svg>
            </MapView.Marker>
        );
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