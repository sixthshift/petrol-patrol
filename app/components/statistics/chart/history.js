import { curveNatural } from 'd3-shape';
import { get, maxBy, minBy, round } from 'lodash';
import moment from 'moment';
import React from 'react';
import { View } from 'react-native';
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts';

import Colours from '../../../constants/colours';
import { Tooltip } from '../../decorators/chart';
import { intervalise } from '../../../utils';

const nXAxis = 5;
const nYAxis = 5;

const yAxisWidth = 30;
const xAxisHeight = 30;

class HistoryChart extends React.Component {

    xAccessor({ item }) {
        return item.timestamp;
    }

    yAccessor({ item }) {
        return round(item.mean, 1);
    }

    render() {
        const xAxis = intervalise(
            get(minBy(this.props.data, 'timestamp'), 'timestamp', undefined),
            get(maxBy(this.props.data, 'timestamp'), 'timestamp', undefined),
            nXAxis
        );
        const yAxis = intervalise(
            get(minBy(this.props.data, 'mean'), 'mean', undefined),
            get(maxBy(this.props.data, 'mean'), 'mean', undefined),
            nYAxis
        );
        return (
            <View>
                <View style={{ height: 250, flexDirection: 'row' }}>
                    <YAxis
                        contentInset={{
                            top: 20,
                            bottom: 20,
                        }}
                        data={yAxis}
                        style={{ width: yAxisWidth }}
                        yAccessor={({ item }) => (item)}
                    />
                    <LineChart
                        contentInset={{
                            top: 20,
                            bottom: 20,
                        }}
                        curve={curveNatural}
                        data={this.props.data}
                        style={{
                            flex: 1,
                        }}
                        svg={{
                            stroke: Colours.primary,
                            strokeWidth: 3,
                        }}
                        xAccessor={this.xAccessor}
                        yAccessor={this.yAccessor}
                    >
                        <Grid />
                        <Tooltip
                            xAccessor={this.xAccessor}
                            yAccessor={this.yAccessor}
                        />
                    </LineChart>
                </View>
                <XAxis
                    contentInset={{
                        left: 20,
                        right: 20,
                    }}
                    data={xAxis}
                    formatLabel={(value) => (moment.unix(value).format("D/M"))}
                    style={{ height: xAxisHeight, marginLeft: yAxisWidth }}
                    xAccessor={({ item }) => (item)}
                />
            </View>
        );
    }
}

export default HistoryChart;