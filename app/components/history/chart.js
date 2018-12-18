import { curveStepAfter } from 'd3-shape';
import { get, isEmpty, last, maxBy, minBy } from 'lodash';
import moment from 'moment';
import React from 'react';
import { View } from 'react-native';
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts';

import { Dots, Tooltip } from '../decorators/chart';
import Colours from '../../constants/colours';
import { intervalise } from '../../utils';

const nXAxis = 5;
const nYAxis = 5;

const yAxisWidth = 30;
const xAxisHeight = 30;

class Chart extends React.Component {

    constructor(props) {
        super(props);
        this.now = this.now.bind(this);
    }

    now() {
        const now = { ...last(this.props.data) };
        now.timestamp = moment().unix();
        return now;
    }

    render() {
        if (isEmpty(this.props.data)) {
            return (null);
        } else {
            const xAxis = intervalise(
                get(minBy([...this.props.data, this.now()], 'timestamp'), 'timestamp', undefined),
                get(maxBy([...this.props.data, this.now()], 'timestamp'), 'timestamp', undefined),
                nXAxis
            );
            const yAxis = intervalise(
                get(minBy(this.props.data, 'price'), 'price', undefined),
                get(maxBy(this.props.data, 'price'), 'price', undefined),
                nYAxis
            );
            return (
                <View>
                    <View style={{ height: 250, flexDirection: 'row' }}>
                        <YAxis
                            contentInset={{
                                bottom: 20,
                                top: 20,
                            }}
                            data={yAxis}
                            style={{ width: yAxisWidth }}
                        />
                        <LineChart
                            contentInset={{
                                bottom: 20,
                                left: 20,
                                right: 20,
                                top: 20,
                            }}
                            curve={curveStepAfter}
                            data={[...this.props.data, this.now()]}
                            style={{
                                flex: 1,
                            }}
                            svg={{
                                stroke: Colours.primary,
                                strokeWidth: 3,
                            }}
                            xAccessor={({ item }) => (item.timestamp)}
                            yAccessor={({ item }) => (item.price)}
                        >
                            <Dots
                                xAccessor={({ item }) => (item.timestamp)}
                                yAccessor={({ item }) => (item.price)}
                            />
                            <Tooltip
                                xAccessor={({ item }) => (item.timestamp)}
                                yAccessor={({ item }) => (item.price)}
                            />
                            <Grid />
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
}

export default Chart;