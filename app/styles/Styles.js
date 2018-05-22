import { StatusBar, StyleSheet } from 'react-native'
import Colours from '../constants/Colours'

export default StyleSheet.create({
    rootContainerStyle: {
        flex: 1,
        marginTop: StatusBar.currentHeight
    },
    container: {
        flex: 1,
        backgroundColor: Colours.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabBarStyle: {
        backgroundColor: Colours.primaryColour
    },
    tabBarIndicatorStyle: {
        backgroundColor: Colours.accentColour
    }
})