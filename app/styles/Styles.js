import { StatusBar, StyleSheet } from 'react-native'
import Colours from '../constants/Colours'

export default StyleSheet.create({
    rootContainerStyle: {
        flex: 1,
        marginTop: StatusBar.currentHeight
    },
    tabBarStyle: {
        backgroundColor: Colours.primaryColour
    },
    tabBarIndicatorStyle: {
        backgroundColor: Colours.accentColour
    }
})