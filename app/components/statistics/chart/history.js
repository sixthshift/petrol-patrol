import { get, maxBy, minBy, } from 'lodash';
import moment from 'moment';
import React from 'react';
import { View } from 'react-native';
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts';

import Colours from '../../../constants/colours';
import { intervalise } from '../../../utils';

const nXAxis = 5;
const nYAxis = 5;

class HistoryChart extends React.Component {

    constructor(props) {
        super(props);
        this.xAxis = intervalise(
            get(minBy(props.data, 'timestamp'), 'timestamp', undefined),
            get(maxBy(props.data, 'timestamp'), 'timestamp', undefined),
            nXAxis
        );
        this.yAxis = intervalise(
            get(minBy(props.data, 'mean'), 'mean', undefined),
            get(maxBy(props.data, 'mean'), 'mean', undefined),
            nYAxis
        );
    }

    render() {
        return (
            <View style={{ height: 250 }}>
                <LineChart
                    contentInset={{
                        top: 20,
                        bottom: 20,
                    }}
                    data={this.props.data}
                    style={{
                        flex: 1,
                    }}
                    svg={{
                        stroke: Colours.primary,
                        strokeWidth: 3,
                    }}
                    xAccessor={({ item }) => (item.timestamp)}
                    yAccessor={({ item }) => (item.mean)}
                >
                    <Grid />
                </LineChart>
                <XAxis
                    contentInset={{
                        left: 20,
                        right: 20,
                    }}
                    data={this.xAxis}
                    formatLabel={(value) => (moment.unix(value).format("D/M"))}
                    xAccessor={({ item }) => (item)}
                />
            </View>
        );
    }
}

export default HistoryChart;