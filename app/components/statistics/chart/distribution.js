import { get, maxBy, minBy, reduce, toNumber } from 'lodash';
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

class DistributionChart extends React.Component {

    xAccessor({ item }) {
        return item.index;
    }

    yAccessor({ item }) {
        return item.value;
    }

    render() {
        const distribution = reduce(this.props.data.distribution, (accumulator, value, key) => {
            accumulator.push({ index: toNumber(key), value: value });
            return accumulator;
        }, []);
        const xAxis = intervalise(
            get(minBy(distribution, 'index'), 'index', undefined),
            get(maxBy(distribution, 'index'), 'index', undefined),
            nXAxis
        );
        const yAxis = intervalise(
            get(minBy(distribution, 'value'), 'value', undefined),
            get(maxBy(distribution, 'value'), 'value', undefined),
            nYAxis
        );
        return (
            <View>
                <View style={{ height: 250, flexDirection: 'row' }}>
                    <YAxis
                        contentInset={{
                            top: 10,
                            bottom: 10,
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
                        data={distribution}
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
                    formatLabel={(value) => (value)}
                    style={{ height: xAxisHeight, marginLeft: yAxisWidth }}
                    xAccessor={({ item }) => (item)}
                />
            </View >
        );
    }
}

export default DistributionChart;