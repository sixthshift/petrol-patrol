import { Font } from "expo";
import { isEmpty } from 'lodash';
import { Button, Header as NBHeader, Icon, Left, Right, Text } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';

import Search from './search';
import { getSelectedFueltype } from '../../selectors';

const BackButton = (props) => {
    if (props.showBack) {
        return (
            <Button transparent onPress={() => { props.navigation.goBack() }}>
                <Icon name='arrow-back' />
            </Button>
        );
    } else {
        return null;
    }
}

const BrandsButton = (props) => {
    if (props.showBrands) {
        return (
            <Button transparent onPress={() => { props.navigation.navigate('brands') }}>
                <Icon type='MaterialIcons' name='local-gas-station' />
            </Button>
        );
    } else {
        return null;
    }
}

const FueltypesButton = (props) => {
    if (props.showFueltypes) {
        if (props.ready && !isEmpty(props.selectedFueltype)) {
            return (
                <Button transparent onPress={() => { props.navigation.navigate('fueltypes') }}>
                    <Text>{props.selectedFueltype}</Text>
                </Button>
            );
        } else {
            return (
                <Button transparent onPress={() => { props.navigation.navigate('fueltypes') }}>
                    <Icon type='Entypo' name='drop' />
                </Button>
            );
        }
    } else {
        return null;
    }
}

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = { ready: false };
    }

    static defaultProps() {
        return {
            showBack: true,
            showBrands: false,
            showFueltypes: false,
            showSearch: false,
        };
    }

    async componentDidMount() {
        // This is needed for text in the header as an error will occur
        await Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });
        this.setState({ ready: true });
    }

    render() {
        return (
            <View>
                <NBHeader>
                    <Left>
                        <BackButton {...this.props} />
                    </Left>
                    <Right>
                        <BrandsButton {...this.props} />
                        <FueltypesButton {...this.props} {...this.state} />
                    </Right>
                </NBHeader>
                <Search {...this.props} />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        selectedFueltype: getSelectedFueltype(state)
    };
};

export default withNavigation(connect(mapStateToProps)(Header));
