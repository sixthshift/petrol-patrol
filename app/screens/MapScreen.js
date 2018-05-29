import { MapView } from 'expo';
import React from 'React';

import Map from '../constants/Map'
import Styles from '../styles/Styles'

export default class MapScreen extends React.Component {
    render() {
        return (
            <MapView
                pitchEnabled={false}
                showsBuildings={false}
                showsTraffic={true}
                style={Styles.map}
                initialRegion={Map.initialRegion}
            />
        )
    }
}