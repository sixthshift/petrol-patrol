import React from 'react';
import { G, Path, Svg } from 'react-native-svg'

class Price extends React.Component {
    render() {
        return (
            <Svg
                height={24}
                width={24}
                viewBox="0 0 24 24"
            >
                <G fill="#FFF">
                    <Path d="M 3,18 H 9 V 16 H 3 Z M 3,6 V 8 H 21 V 6 Z m 0,7 H 15 V 11 H 3 Z" />
                </G>
                <G
                    fill="#FFF"
                    scale="0.5"
                    x="12"
                    y="12"
                >
                    <Path d="M 11.8,10.9 C 9.53,10.31 8.8,9.7 8.8,8.75 8.8,7.66 9.81,6.9 11.5,6.9 13.28,6.9 13.94,7.75 14,9 h 2.21 C 16.14,7.28 15.09,5.7 13,5.19 V 3 H 10 V 5.16 C 8.06,5.58 6.5,6.84 6.5,8.77 c 0,2.31 1.91,3.46 4.7,4.13 2.5,0.6 3,1.48 3,2.41 0,0.69 -0.49,1.79 -2.7,1.79 -2.06,0 -2.87,-0.92 -2.98,-2.1 h -2.2 c 0.12,2.19 1.76,3.42 3.68,3.83 V 21 h 3 v -2.15 c 1.95,-0.37 3.5,-1.5 3.5,-3.55 0,-2.84 -2.43,-3.81 -4.7,-4.4 z" />
                </G>
            </Svg>
        );
    }
}

export default Price;