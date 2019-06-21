import { isEqual, map } from 'lodash';
import React from 'react';
import { Circle, G, Line, Rect, Text } from 'react-native-svg';

import Colours from '../../../constants/colours';

const tooltipHeight = 20;
const tooltipWidth = 40;

const tooltipHeightOffset = 20;

class Tooltip extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: null,
        };

        this.onPress = this.onPress.bind(this);
        this.selected = this.selected.bind(this);
        this.x = this.x.bind(this);
        this.y = this.y.bind(this);
    }

    onPress(key) {
        // If the selected tooltip is already visible, hide it
        if (this.selected(key)) {
            this.setState({
                selected: null,
            });
        } else {
            this.setState({
                selected: key,
            });
        }
    }

    selected(key) {
        return (isEqual(this.state.selected, key));
    }

    x(index) {
        // Scale index to canvas
        index = this.props.x(index);
        // Adjust for tooltip width
        index -= tooltipWidth / 2;
        // If bandwidth exists, it is a bar chart, adjust for band width
        index += this.props.bandwidth ? (this.props.bandwidth / 2) : 0;
        return index;
    }

    y(value, heightOffset = false) {
        // Scale value to canvas
        value = this.props.y(value);
        // Adjust for tooltip height
        value -= (tooltipHeight / 2)
        // If heightOffset enabled, adjust for tootip height offset
        value -= heightOffset ? tooltipHeightOffset : 0;
        return value;
    }

    render() {
        return (
            map(this.props.data, (item) => {
                if (this.selected(item)) {
                    return (
                        <G
                            key={this.props.xAccessor({ item: item })}
                            x={this.x(this.props.xAccessor({ item: item }))}
                            y={this.y(this.props.yAccessor({ item: item }), true)}
                        >
                            <Rect
                                fill={'white'}
                                height={tooltipHeight}
                                rx={5}
                                ry={5}
                                stroke={Colours.primary}
                                strokeWidth={2}
                                onPress={() => (this.onPress(item))}
                                width={tooltipWidth}
                            />
                            <Line
                                stroke={Colours.primary}
                                strokeWidth={2}
                                x1={tooltipWidth / 2}
                                y1={tooltipHeight}
                                x2={tooltipWidth / 2}
                                y2={(tooltipHeight / 2) + tooltipHeightOffset}
                            />
                            <Text
                                alignmentBaseline={'middle'}
                                fill={Colours.primaryText}
                                textAnchor={'middle'}
                                x={tooltipWidth / 2}
                                y={tooltipHeight / 2}
                            >
                                {this.props.yAccessor({ item: item })}
                            </Text>
                        </G>
                    );
                } else {
                    return (
                        <G
                            key={this.x(this.props.xAccessor({ item: item }))}
                            x={this.x(this.props.xAccessor({ item: item }))}
                            y={this.y(this.props.yAccessor({ item: item }), false)}
                        >
                            <Circle
                                cx={tooltipWidth / 2}
                                cy={tooltipHeight / 2}
                                fill={'#00000000'}
                                key={this.props.xAccessor({ item: item })}
                                onPress={() => (this.onPress(item))}
                                r={15}
                                stroke={'#FFFFFF'}
                                strokeWidth={0}
                            />
                        </G>
                    );
                }
            })
        );
    }
}

export default Tooltip;