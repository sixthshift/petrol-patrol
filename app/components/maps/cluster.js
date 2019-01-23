import { MapView, Svg } from 'expo';
import { map } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import { addVisibleMarkerAction, removeVisibleMarkerAction } from '../../actions';

const markerSize = 36;
const borderSize = 2;

class Cluster extends React.Component {

    constructor(props) {
        super(props);
        this._getChildren = this._getChildren.bind(this);
    }

    componentDidMount() {
        this.props.addVisibleMarkers(this._getChildren());
    }

    componentWillUnmount() {
        this.props.removeVisibleMarkers(this._getChildren());
    }

    _getChildren() {
        const children = this.props.clusterEngine.getLeaves(this.props.clusterId, Infinity);
        return map(children, (child) => (child.properties.item.id));
    }

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

const mapDispatchToProps = (dispatch) => {
    return {
        addVisibleMarkers: (stationIDs) => {
            dispatch(addVisibleMarkerAction(stationIDs))
        },
        removeVisibleMarkers: (stationIDs) => {
            dispatch(removeVisibleMarkerAction(stationIDs))
        },
    };
};

export default connect(null, mapDispatchToProps)(Cluster);