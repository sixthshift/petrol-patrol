import PropTypes from 'prop-types';
import React from 'React';
import { Text, View } from 'react-native';
import { Checkbox } from 'react-native-paper';

import Styles from '../styles/Styles';
import Colours from '../constants/Colours';

export default class ListItem extends React.Component {

    static propTypes = {
        text: PropTypes.string.isRequired
    }

    render() {
        const { text } = this.props;
        return (
            <View style={Styles.listItem}>
                <Text>{text}</Text>
                <Checkbox color={Colours.primary} />
            </View>
        );
    }
}