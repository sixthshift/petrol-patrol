import { curveNatural } from 'd3-shape';
import { get, pick, maxBy, minBy, round } from 'lodash';
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

const contentInset = {
    bottom: 25,
    left: 25,
    right: 25,
    top: 35,
}

class HistoryChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.prepare(props.data);
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState(this.prepare(this.props.data));
        }
    }

    prepare(statistics) {
        return {
            xAxis: intervalise(
                get(minBy(statistics, 'timestamp'), 'timestamp', undefined),
                get(maxBy(statistics, 'timestamp'), 'timestamp', undefined),
                nXAxis
            ),
            yAxis: intervalise(
                get(minBy(statistics, 'mean'), 'mean', undefined),
                get(maxBy(statistics, 'mean'), 'mean', undefined),
                nYAxis
            )
        };
    }

    xAccessor({ item }) {
        return item.timestamp;
    }

    yAccessor({ item }) {
        return round(item.mean, 1);
    }

    render() {
        return (
            <View>
                <View style={{ height: 300, flexDirection: 'row' }}>
                    <YAxis
                        contentInset={pick(contentInset, ['bottom', 'top'])}
                        data={this.state.yAxis}
                        style={{ width: yAxisWidth }}
                        yAccessor={({ item }) => (item)}
                    />
                    <LineChart
                        contentInset={contentInset}
                        curve={curveNatural}
                        data={this.props.data}
                        style={{
                            flex: 1,
                        }}
                        svg={{
                            stroke: Colours.primaryDark,
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
                    contentInset={pick(contentInset, ['left', 'right'])}
                    data={this.state.xAxis}
                    formatLabel={(value) => (moment.unix(value).format("D/M"))}
                    style={{ height: xAxisHeight, marginLeft: yAxisWidth }}
                    xAccessor={({ item }) => (item)}
                />
            </View>
        );
    }
}

export default HistoryChart;