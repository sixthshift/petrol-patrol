import { curveStepAfter } from 'd3-shape';
import { get, isEmpty, last, maxBy, minBy, pick } from 'lodash';
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

const contentInset = {
    bottom: 25,
    left: 25,
    right: 25,
    top: 35,
}

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

    xAccessor({ item }) {
        return item.timestamp;
    }

    yAccessor({ item }) {
        return item.price;
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
                            contentInset={pick(contentInset, ['bottom', 'top'])}
                            data={yAxis}
                            style={{ width: yAxisWidth }}
                        />
                        <LineChart
                            contentInset={contentInset}
                            curve={curveStepAfter}
                            data={[...this.props.data, this.now()]}
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
                            <Dots
                                xAccessor={this.xAccessor}
                                yAccessor={this.yAccessor}
                            />
                            <Tooltip
                                xAccessor={this.xAccessor}
                                yAccessor={this.yAccessor}
                            />
                            <Grid />
                        </LineChart>
                    </View>
                    <XAxis
                        contentInset={pick(contentInset, ['left', 'right'])}
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