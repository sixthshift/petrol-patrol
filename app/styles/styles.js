import { Constants } from 'expo'
import { StyleSheet } from 'react-native';

import Colours from '../constants/colours';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    root: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
    }
});