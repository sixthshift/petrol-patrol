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

    render() {
        return (
            map(this.props.data, (item) => {
                const x = this.props.xAccessor({ item: item });
                const y = this.props.yAccessor({ item: item });
                if (this.selected(item)) {
                    return (
                        <G
                            key={this.props.xAccessor({ item: item })}
                            onPress={() => (this.onPress(item))}
                            x={this.props.x(x) - (tooltipWidth / 2)}
                            y={this.props.y(y) - (tooltipHeight / 2) - tooltipHeightOffset}
                        >
                            <Rect
                                height={tooltipHeight}
                                width={tooltipWidth}
                                stroke={Colours.primary}
                                strokeWidth={2}
                                fill={'white'}
                                ry={5}
                                rx={5}
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
                            key={this.props.xAccessor({ item: item })}
                            onPress={() => (this.onPress(item))}
                            x={this.props.x(x) - (tooltipWidth / 2)}
                            y={this.props.y(y) - (tooltipHeight / 2)}
                        >
                            <Circle
                                key={this.props.xAccessor({ item: item })}
                                cx={tooltipWidth / 2}
                                cy={tooltipHeight / 2}
                                r={10}
                                stroke={'#00000000'}
                                strokeWidth={0}
                                fill={'#00000000'}
                            />
                        </G>
                    );
                }
            })
        );
    }
}

export default Tooltip;