import { Font, Linking } from "expo";
import { isEmpty, isEqual } from 'lodash';
import { Button, Header as NBHeader, Icon, Left, Right, Text } from 'native-base';
import { stringify } from 'query-string';
import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';

import Search from './search';
import { getSelectedFueltype } from '../../selectors';
import { now } from '../../utils';

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

const DrawerButton = (props) => {
    if (props.showDrawer) {
        return (
            <Button transparent onPress={() => { props.navigation.toggleDrawer() }}>
                <Icon type='MaterialIcons' name='menu' />
            </Button>
        );
    } else {
        return null;
    }
};

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

const ListButton = (props) => {
    if (props.showList) {
        return (
            <Button transparent onPress={() => { props.navigation.navigate('list') }}>
                <Icon type="MaterialIcons" name="view-list" />
            </Button>
        );
    } else {
        return null;
    }
};

const ReportButton = (props) => {
    if (props.showReport) {
        const onReportPress = () => {
            const baseURL = 'https://www.cas.fairtrading.nsw.gov.au/icmspublicweb/forms/FuelCheck.html';
            const query = {
                FuelType: props.navigation.state.params.fueltype,
                Price: props.navigation.state.params.price.price,
                Date: now().format('DD/MM/YYYY'),
                Time: now().format('h:mmA'),
                SS: props.navigation.state.params.station.name
                    + ' ' + props.navigation.state.params.station.street
                    + ' ' + props.navigation.state.params.station.suburb
                    + ' ' + props.navigation.state.params.station.state
                    + ' ' + props.navigation.state.params.station.postcode,
            };
            const queryString = stringify(query);
            Linking.openURL(baseURL + '?' + queryString);
        }
        return (
            <Button transparent onPress={onReportPress}>
                <Icon type="MaterialIcons" name="error-outline" />
            </Button>
        );
    } else {
        return null;
    }
};

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
            showList: false,
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

    shouldComponentUpdate(nextProps, nextState) {
        const beforeProps = this.props;
        const afterProps = nextProps;
        const beforeState = this.state;
        const afterState = nextState;
        return !isEqual(beforeProps, afterProps) || beforeState != afterState;
    }

    render() {
        return (
            <View>
                <NBHeader>
                    <Left>
                        <BackButton {...this.props} />
                        <DrawerButton {...this.props} />
                    </Left>
                    <Right>
                        <ReportButton {...this.props} />
                        <FueltypesButton {...this.props} {...this.state} />
                        <BrandsButton {...this.props} />
                        <ListButton {...this.props} />
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
