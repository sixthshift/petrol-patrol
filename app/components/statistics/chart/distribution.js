import { get, maxBy, minBy, reduce, toNumber } from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts';

import Colours from '../../../constants/colours';
import { intervalise } from '../../../utils';

const nXAxis = 5;
const nYAxis = 5;

class DistributionChart extends React.Component {

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
            <View style={{ height: 250 }}>
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
                    xAccessor={({ item }) => (item.index)}
                    yAccessor={({ item }) => (item.value)}
                >
                    <Grid />
                </LineChart>
                <XAxis
                    contentInset={{
                        left: 20,
                        right: 20,
                    }}
                    data={xAxis}
                    formatLabel={(value) => (value)}
                    xAccessor={({ item }) => (item)}
                />
            </View>
        );
    }
}

export default DistributionChart;