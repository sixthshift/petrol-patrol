import { Constants } from 'expo'
import { StyleSheet } from 'react-native';
import Colours from '../constants/Colours';

export default StyleSheet.create({
    rootContainerStyle: {
        flex: 1,
        marginTop: Constants.StatusBarHeight
    },
    container: {
        flex: 1,
        backgroundColor: Colours.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: Colours.backgroundColour,
    }
});