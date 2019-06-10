import { loadAsync } from 'expo-font';
import { isEmpty } from 'lodash';
import { Button, Icon, Text } from 'native-base';
import React from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import Roboto from '../../../../node_modules/native-base/Fonts/Roboto.ttf';
import Roboto_medium from '../../../../node_modules/native-base/Fonts/Roboto_medium.ttf';
import { getSelectedFueltype } from '../../../selectors';

class FueltypesButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = { ready: false };
    }

    async componentDidMount() {
        // This is needed for text in the header as an error will occur
        await loadAsync({
            Roboto: Roboto,
            Roboto_medium: Roboto_medium,
        });
        this.setState({ ready: true });
    }

    render() {
        if (this.state.ready && !isEmpty(this.props.selectedFueltype)) {
            return (
                <Button transparent onPress={() => { this.props.navigation.navigate('fueltypes') }}>
                    <Text>{this.props.selectedFueltype}</Text>
                </Button>
            );
        } else {
            return (
                <Button transparent onPress={() => { this.props.navigation.navigate('fueltypes') }}>
                    <Icon type='Entypo' name='drop' />
                </Button>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        selectedFueltype: getSelectedFueltype(state)
    };
};

export default withNavigation(connect(mapStateToProps)(FueltypesButton));