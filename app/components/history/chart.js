import React from 'react';
import { View } from 'react-native';
import { AbstractChart } from 'react-native-chart-kit';
import { Circle, G, Polygon, Polyline, Rect, Svg, } from 'react-native-svg';

class Chart extends AbstractChart {

    renderDots = (config) => {
        const { data, width, height, paddingTop, paddingRight } = config;
        let output = [];
        data.map((dataset) => {
            dataset.data.map((x, i) => {
                output.push(
                    <Circle
                        key={Math.random()}
                        cx={paddingRight + (i * (width - paddingRight) / dataset.data.length)}
                        cy={((height / 4 * 3 * (1 - ((x - Math.min(...dataset.data)) / this.calcScaler(dataset.data)))) + paddingTop)}
                        r="4"
                        fill={this.props.chartConfig.color(0.7)}
                    />
                );
            });
        });
        return (
            output
        );
    }

    renderShadow = (config) => {
        const { width, height, paddingRight, paddingTop } = config;
        let output = [];
        config.data.map((dataset, index) => {
            const points = dataset.data.map((x, i) => ([
                (paddingRight + (i * (width - paddingRight) / dataset.data.length)),
                (((height / 4 * 3 * (1 - ((x - Math.min(...dataset.data)) / this.calcScaler(dataset.data))))) + paddingTop)
            ]));

            let steppedPoints = [points[0]];
            for (let i = 1; i < points.length; i++) {
                steppedPoints.push([points[i][0], points[i - 1][1]]);
                steppedPoints.push(points[i]);
            }
            steppedPoints = steppedPoints.map((point) => (point[0] + "," + point[1]));
            output.push(
                <Polygon
                    key={index}
                    points={steppedPoints + ` ${paddingRight + ((width - paddingRight) / dataset.data.length * (dataset.data.length - 1))},${(height / 4 * 3) + paddingTop} ${paddingRight},${(height / 4 * 3) + paddingTop}`}
                    fill="url(#fillShadowGradient)"
                    strokeWidth={0}
                />);
        });
        return (
            output
        );
    }

    renderLine = (config) => {
        const { width, height, paddingRight, paddingTop, data } = config;
        let output = [];
        data.map((dataset, index) => {
            const points = dataset.data.map((x, i) => ([
                (paddingRight + (i * (width - paddingRight) / dataset.data.length)),
                (((height / 4 * 3 * (1 - ((x - Math.min(...dataset.data)) / this.calcScaler(dataset.data))))) + paddingTop)
            ]));
            let steppedPoints = [points[0]];
            for (let i = 1; i < points.length; i++) {
                steppedPoints.push([points[i][0], points[i - 1][1]]);
                steppedPoints.push(points[i]);
            }
            steppedPoints = steppedPoints.map((point) => (point[0] + "," + point[1]));
            output.push(
                <Polyline
                    key={index}
                    points={steppedPoints.join(' ')}
                    fill="none"
                    stroke={this.props.chartConfig.color(0.2)}
                    strokeWidth={3}
                />
            );
        });
        return (
            output
        );
    }

    render() {
        const paddingTop = 16;
        const paddingRight = 64;
        const { width, height, data, withShadow = true, withDots = true, style = {} } = this.props;
        const { labels = [] } = data;
        const { borderRadius = 0 } = style;
        const config = {
            width,
            height
        };
        return (
            <View style={style}>
                <Svg
                    height={height}
                    width={width}
                >
                    <G>
                        {this.renderDefs({
                            ...config,
                            ...this.props.chartConfig
                        })}
                        <Rect
                            width="100%"
                            height={height}
                            rx={borderRadius}
                            ry={borderRadius}
                            fill="url(#backgroundGradient)" />
                        {this.renderHorizontalLabels({
                            ...config,
                            count: (Math.min(...data.datasets[0].data) === Math.max(...data.datasets[0].data)) ?
                                1 : 4,
                            data: data.datasets[0].data,
                            paddingTop,
                            paddingRight
                        })}
                        {this.renderVerticalLabels({
                            ...config,
                            labels,
                            paddingRight,
                            paddingTop
                        })}
                        {this.renderLine({
                            ...config,
                            paddingRight,
                            paddingTop,
                            data: data.datasets
                        })}
                        {withShadow && this.renderShadow({
                            ...config,
                            data: data.datasets,
                            paddingRight,
                            paddingTop
                        })}
                        {withDots && this.renderDots({
                            ...config,
                            data: data.datasets,
                            paddingTop,
                            paddingRight
                        })}
                    </G>
                </Svg>
            </View>
        );
    }
}

export default Chart;
