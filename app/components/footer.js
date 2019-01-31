import { isEqual, pick } from 'lodash';
import { Button, Footer as NBFooter, FooterTab, Icon } from 'native-base';
import React from 'react';
import { withNavigation, StackActions, NavigationActions } from 'react-navigation';

const MapsButton = (props) => {
    const routeName = 'maps';
    const active = props.navigation.state.routeName === routeName;
    const onPress = () => {
        if (!active) {
            const action = StackActions.reset({
                actions: [NavigationActions.navigate({ routeName: routeName })],
                index: 0,
                key: null,
            });
            props.navigation.dispatch(action);
        }
    };
    return (
        <Button active={active} onPress={onPress}>
            <Icon type='MaterialIcons' name='map' />
        </Button>
    );
};

const FavouritesButton = (props) => {
    const routeName = 'favourites';
    const active = props.navigation.state.routeName === routeName;
    const onPress = () => {
        if (!active) {
            const action = StackActions.reset({
                actions: [NavigationActions.navigate({ routeName: routeName })],
                index: 0,
                key: null,
            });
            props.navigation.dispatch(action);
        }
    };
    return (
        <Button active={active} onPress={onPress}>
            <Icon type='MaterialIcons' name='favorite' />
        </Button>
    );
};

const StatisticsButton = (props) => {
    const routeName = 'statistics';
    const active = props.navigation.state.routeName === routeName;
    const onPress = () => {
        if (!active) {
            const action = StackActions.reset({
                actions: [NavigationActions.navigate({ routeName: routeName })],
                index: 0,
                key: null,
            });
            props.navigation.dispatch(action);
        }
    };
    return (
        <Button active={active} onPress={onPress}>
            <Icon type='MaterialIcons' name='show-chart' />
        </Button>
    );
};

class Footer extends React.Component {

    shouldComponentUpdate(nextProps) {
        const before = pick(this.props, 'navigation');
        const after = pick(nextProps, 'navigation');
        return !isEqual(before, after);
    }

    render() {
        return (
            <NBFooter>
                <FooterTab>
                    <StatisticsButton {...this.props} />
                    <MapsButton {...this.props} />
                    <FavouritesButton {...this.props} />
                </FooterTab>
            </NBFooter>
        );
    }
}

export default withNavigation(Footer);