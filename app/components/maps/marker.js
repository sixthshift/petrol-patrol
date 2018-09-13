import { MapView, Svg } from 'expo';
import _ from 'lodash';
import React from 'react';

export default class Marker extends React.Component {
    render() {
        const markerProps = _(this.props).pick(['coordinate', 'title']).value();
        const colour = _(this.props).get('colour', 'grey');
        const text = _(this.props).get('text', 'N/A');
        return (
            <MapView.Marker {...markerProps}>
                <Svg
                    height="36"
                    width="48"
                >
                    <Svg.Path
                        d="M4,4 L44,4 L44,24 C28,24 28,24 24,32 C20,24 20,24 4,24 z"
                        fill="white"
                        stroke={colour}
                        strokeWidth="3"
                    >
                    </Svg.Path>
                    <Svg.Text
                        fill="black"
                        fontSize="10"
                        fontWeight="bold"
                        x="24"
                        y="18"
                        textAnchor="middle"
                    >{text}</Svg.Text>
                </Svg>
            </MapView.Marker>
        );
    }
}