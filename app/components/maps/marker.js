import { MapView, Svg } from 'expo';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

class Marker extends React.Component {

    constructor(props) {
        super(props);
        this.markerProps = {
            coordinate: {
                latitude: this.props.station.l[0],
                longitude: this.props.station.l[1],
            }
        }
        this.state = {
            colour: 'grey',
            text: 'N/A'
        };
    }

    render() {
        return (
            <MapView.Marker {...this.markerProps}>
                <Svg
                    height="36"
                    width="48"
                >
                    <Svg.Path
                        d="M4,4 L44,4 L44,24 C28,24 28,24 24,32 C20,24 20,24 4,24 z"
                        fill="white"
                        stroke={this.state.colour}
                        strokeWidth="2"
                    >
                    </Svg.Path>
                    <Svg.Text
                        fill="black"
                        fontSize="10"
                        fontWeight="bold"
                        x="24"
                        y="18"
                        textAnchor="middle"
                    >{this.state.text}</Svg.Text>
                </Svg>
            </MapView.Marker>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        selectedBrands: state.ui.brands,
        selectedFueltype: state.ui.fueltype,
    };
};

export default connect(mapStateToProps)(Marker);