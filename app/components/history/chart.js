import { get, isEmpty, maxBy, minBy, } from 'lodash';
import moment from 'moment';
import React from 'react';
import { View } from 'react-native';
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts';

import Colours from '../../constants/colours';
import { intervalise } from '../../utils';

const nXAxis = 5;
const nYAxis = 5;

const yAxisWidth = 30;
const xAxisHeight = 30;

class Chart extends React.Component {

    render() {
        if (isEmpty(this.props.data)) {
            return (null);
        } else {
            const xAxis = intervalise(
                get(minBy(this.props.data, 'timestamp'), 'timestamp', undefined),
                get(maxBy(this.props.data, 'timestamp'), 'timestamp', undefined),
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
                                top: 20,
                                bottom: 20,
                            }}
                            data={yAxis}
                            style={{ width: yAxisWidth }}
                        />
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
                            yAccessor={({ item }) => (item.price)}
                        >
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