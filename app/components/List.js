import PropTypes from 'prop-types';
import React from 'React';
import { View } from 'react-native';

import Styles from '../styles/Styles';

export default class List extends React.Component {

    static propTypes = {
        children: PropTypes.arrayOf(PropTypes.object)
    }

    render() {
        return (
            <View style={Styles.list}>
                {this.props.children}
            </View>
        );
    }
}