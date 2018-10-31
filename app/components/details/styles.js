import { StyleSheet } from 'react-native';

import colours from '../../constants/colours';

export default StyleSheet.create({
    card: {
        marginLeft: 10,
        marginRight: 10,
    },
    details: {
        backgroundColor: colours.primary,
        flex: 1,
    },
    info: {
        flex: 0,
    },
    list: {
        flex: 2,
    },
    map: {
        flex: 1,
    },
});