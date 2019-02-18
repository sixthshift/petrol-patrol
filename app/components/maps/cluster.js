import { MapView, Svg } from 'expo';
import { map, memoize } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import { addVisibleMarkerAction, removeVisibleMarkerAction } from '../../actions';
import { markerBorder, markerWidth as markerSize } from '../../constants/maps';

const centrePosition = memoize(() => (markerSize - markerBorder) / 2);
const centreTextPosition = memoize(() => (markerSize / 2));
const radius = memoize(() => ((markerSize * (7 / 20)) - markerBorder));

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
                        cx={centrePosition()}
                        cy={centrePosition()}
                        fill="white"
                        r={radius(this.props.pointCount)}
                        stroke="grey"
                        strokeWidth={markerBorder}
                    />
                    <Svg.Text
                        fill="black"
                        fontSize="15"
                        fontWeight="bold"
                        x={centreTextPosition()}
                        y={centreTextPosition()}
                        dx="-0.1em"
                        dy="0.25em"
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