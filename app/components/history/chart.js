import { isEmpty, maxBy, minBy, } from 'lodash';
import moment from 'moment';
import React from 'react';
import { View } from 'react-native';
import { Grid, LineChart, XAxis } from 'react-native-svg-charts';

import Colours from '../../constants/colours';
import { intervalise } from '../../utils';

const nXAxis = 5;

class Chart extends React.Component {

    render() {
        if (isEmpty(this.props.data)) {
            return (null);
        } else {
            const startXAxis = minBy(this.props.data, 'timestamp').timestamp;
            const endXAxis = maxBy(this.props.data, 'timestamp').timestamp;
            const xAxis = intervalise(startXAxis, endXAxis, nXAxis);
            return (
                <View style={{ height: 250, padding: 20 }}>
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
                    <XAxis
                        contentInset={{
                            left: 20,
                            right: 20,
                        }}
                        data={xAxis}
                        formatLabel={(value) => (moment.unix(value).format("D/M"))}
                        style={{
                            marginHorizontal: -10,
                        }}
                        svg={{
                            fontSize: 10,
                            fill: 'black',
                        }}
                        xAccessor={({ item }) => (item)}
                    />
                </View>
            );
        }
    }
}

export default Chart;