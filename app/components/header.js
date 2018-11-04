import { Font } from "expo";
import { Button, Header as NBHeader, Input, Icon, Item, Left, Right, Text } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';

import { getSelectedFueltype } from '../selectors';

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
        return (
            <Button transparent onPress={() => { props.navigation.navigate('fueltypes') }}>
                { props.ready ? <Text>{ props.selectedFueltype }</Text> : <Icon type='Entypo' name='drop' /> }
            </Button>
        );
    } else {
        return null;
    }
}

const SearchBar = (props) => {
    if (props.showSearch) {
        return (
            <NBHeader searchBar rounded>
                <Item>
                    <Icon name='search' />
                    <Input placeholder='Search' />
                </Item>
            </NBHeader>
        );
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

    async componentWillMount() {
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
                <SearchBar {...this.props} />
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