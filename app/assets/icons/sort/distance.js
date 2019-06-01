import { Svg } from 'expo';
import React from 'react';
import { G, Path } from 'react-native-svg'

class Distance extends React.Component {

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
                    <Path d="M 12,2 C 8.13,2 5,5.13 5,9 c 0,5.25 7,13 7,13 0,0 7,-7.75 7,-13 0,-3.87 -3.13,-7 -7,-7 z m 0,9.5 C 10.62,11.5 9.5,10.38 9.5,9 9.5,7.62 10.62,6.5 12,6.5 c 1.38,0 2.5,1.12 2.5,2.5 0,1.38 -1.12,2.5 -2.5,2.5 z" />
                </G>
            </Svg>
        );
    }
}

export default Distance;