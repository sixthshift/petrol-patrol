import { Constants } from 'expo'
import { StyleSheet } from 'react-native';
import Colours from '../constants/Colours';

export default StyleSheet.create({
    rootContainerStyle: {
        flex: 1,
        marginTop: Constants.StatusBarHeight
    },
    button: {
        backgroundColor: Colours.background,
    },
    container: {
        flex: 1,
        backgroundColor: Colours.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flex: 1,
        flexDirection: 'row'
    },
    map: {
        flex: 1.
    },
});