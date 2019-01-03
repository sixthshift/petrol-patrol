import { MapView, Svg } from 'expo';
import React from 'react';

const markerSize = 36;
const borderSize = 2;

export default class Cluster extends React.Component {

    render() {
        return (
            <MapView.Marker {...this.props}>
                <Svg
                    height={markerSize}
                    width={markerSize}
                >
                    <Svg.Circle
                        cx={(markerSize - borderSize) / 2}
                        cy={(markerSize - borderSize) / 2}
                        fill="white"
                        r={(markerSize / 2) - borderSize}
                        stroke="grey"
                        strokeWidth="2"
                    />
                    <Svg.Text
                        fill="black"
                        fontSize="10"
                        fontWeight="bold"
                        x={markerSize / 2}
                        y={markerSize / 2}
                        dx="-0.1em"
                        dy="0.2em"
                        textAnchor="middle"
                    >{this.props.pointCount}</Svg.Text>
                </Svg>
            </MapView.Marker >
        );
    }
}