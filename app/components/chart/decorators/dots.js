import { map, zip } from 'lodash';
import React from 'react';
import { Circle } from 'react-native-svg';

import Colours from '../../../constants/colours';

class Dots extends React.Component {

    render() {
        const xCoords = map(this.props.data, (item) => {
            const xItem = this.props.xAccessor({ item: item });
            return this.props.x(xItem);
        });
        const yCoords = map(this.props.data, (item) => {
            const yItem = this.props.yAccessor({ item: item });
            return this.props.y(yItem);
        });
        const coords = zip(xCoords, yCoords);
        return map(coords, (coord, index) => (
            <Circle
                key={index}
                cx={coord[0]}
                cy={coord[1]}
                r={4}
                stroke={Colours.primary}
                strokeWidth={2}
                fill={'white'}
            />
        ));
    }
}

export default Dots;