import _, { get, isEmpty, maxBy, minBy, pick, reduce, toNumber } from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';

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

class DistributionChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.prepare(props.data);
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState(this.prepare(this.props.data));
        }
    }

    prepare(statistic) {
        const distribution = _(statistic.distribution)
            .reduce((accumulator, value, key) => {
                while (!isEmpty(accumulator) && accumulator[accumulator.length - 1].index < toNumber(key) - 1) {
                    accumulator.push({ index: accumulator[accumulator.length - 1].index + 1, value: 0 });
                }
                accumulator.push({ index: toNumber(key), value: value });
                return accumulator;
            }, [])
            .map((element, index) => ({
                ...element,
                relativeIndex: index,
            }));
        return {
            distribution: distribution,
            xAxis: intervalise(
                get(minBy(distribution, 'index'), 'index', undefined),
                get(maxBy(distribution, 'index'), 'index', undefined),
                nXAxis
            ),
            yAxis: intervalise(
                get(minBy(distribution, 'value'), 'value', undefined),
                get(maxBy(distribution, 'value'), 'value', undefined),
                nYAxis
            ),
        };
    }

    xRelativeAccessor({ item }) {
        return item.relativeIndex;
    }

    xAccessor({ item }) {
        return item.index;
    }

    yAccessor({ item }) {
        return item.value;
    }

    render() {
        if (isEmpty(this.state.distribution)) {
            return (null);
        } else {
            return (
                <View>
                    <View style={{ height: 250, flexDirection: 'row' }}>
                        <YAxis
                            contentInset={pick(contentInset, ['bottom', 'top'])}
                            data={this.state.yAxis}
                            style={{ width: yAxisWidth }}
                            yAccessor={({ item }) => (item)}
                        />
                        <BarChart
                            contentInset={contentInset}
                            data={this.state.distribution}
                            style={{ flex: 1 }}
                            svg={{ fill: Colours.primaryDark }}
                            xAccessor={this.xAccessor}
                            yAccessor={this.yAccessor}
                        >
                            <Grid />
                            <Tooltip
                                xAccessor={this.xRelativeAccessor}
                                yAccessor={this.yAccessor}
                            />
                        </BarChart>
                    </View>
                    <XAxis
                        contentInset={pick(contentInset, ['left', 'right'])}
                        data={this.state.xAxis}
                        formatLabel={(value) => (value)}
                        style={{ height: xAxisHeight, marginLeft: yAxisWidth }}
                        xAccessor={({ item }) => (item)}
                    />
                </View>
            );
        }
    }
}

export default DistributionChart;