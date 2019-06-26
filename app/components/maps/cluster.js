import { isEqual, map, once, pick } from 'lodash';
import React from 'react';
import MapView from 'react-native-maps';
import { Circle, Svg, Text } from 'react-native-svg';
import { connect } from 'react-redux';

import { addVisibleMarkerAction, removeVisibleMarkerAction } from '../../actions';
import { markerBorder, markerWidth as markerSize } from '../../constants/maps';

const centrePosition = once(() => (markerSize - markerBorder) / 2);
const centreTextPosition = once(() => (markerSize / 2));
const radius = once(() => ((markerSize * (7 / 20)) - markerBorder));

class Cluster extends React.Component {

    constructor(props) {
        super(props);
        this.markerProps = {
            coordinate: {
                latitude: props.coordinate.latitude,
                longitude: props.coordinate.longitude,
            },
            tracksViewChanges: false,
        };
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

    shouldComponentUpdate(nextProps) {
        const before = pick(this.props, ['clusterId', 'coordinate', 'pointCount']);
        const after = pick(nextProps, ['clusterId', 'coordinate', 'pointCount']);
        return !isEqual(before, after);
    }

    render() {
        return (
            <MapView.Marker
                {...this.markerProps}
                onPress={this.props.onPress}
            >
                <Svg
                    height={markerSize}
                    width={markerSize}
                >
                    <Circle
                        cx={centrePosition()}
                        cy={centrePosition()}
                        fill="white"
                        r={radius()}
                        stroke="grey"
                        strokeWidth={markerBorder}
                    />
                    <Text
                        fill="black"
                        fontSize="15"
                        fontWeight="bold"
                        x={centreTextPosition()}
                        y={centreTextPosition()}
                        dx="-0.1em"
                        dy="0.25em"
                        textAnchor="middle"
                    >
                        {this.props.pointCount}
                    </Text>
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