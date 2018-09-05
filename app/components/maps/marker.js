import React from 'react';
import { View } from 'react-native';
import styles from './styles';

export default class Marker extends React.Component {

    render() {
        return (
            <View style={styles.marker}>
                <View style={styles.markerOuterBubble} />
                <View style={styles.markerinnerBubble} />
                <View style={styles.markerOuterTail} />
                <View style={styles.markerInnerTail} />
            </View>
        );
    }
}