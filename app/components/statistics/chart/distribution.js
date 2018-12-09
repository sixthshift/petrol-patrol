import { reduce } from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts';

import Colours from '../../../constants/colours';
import { intervalise } from '../../../utils';

const nXAxis = 5;
const nYAxis = 5;

class DistributionChart extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        const distribution = reduce(this.props.data.distribution, (accumulator, value, key) => {
            accumulator.push({ index: key, value: value });
            return accumulator;
        }, []);
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
            </View>
        )
    }
}

export default DistributionChart;