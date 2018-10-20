import { Button, Footer as NBFooter, FooterTab, Icon } from 'native-base';
import React from 'react';
import { withNavigation, StackActions, NavigationActions } from 'react-navigation';

const MapsButton = (props) => {
    const onPress = () => {
        const action = StackActions.reset({
            actions: [NavigationActions.navigate({ routeName: 'maps' })],
            index: 0,
            key: null,
        });
        props.navigation.dispatch(action);
    };
    return (
        <Button onPress={onPress}>
            <Icon type='MaterialIcons' name='map' />
        </Button>
    );
}

const FavouritesButton = (props) => {
    const onPress = () => {
        const action = StackActions.reset({
            actions: [NavigationActions.navigate({ routeName: 'favourites' })],
            index: 0,
            key: null,
            });
        props.navigation.dispatch(action);
    };
    return (
        <Button onPress={onPress}>
            <Icon type='MaterialIcons' name='favorite' />
        </Button>
    );
}

class Footer extends React.Component {

    render() {
        return (
            <NBFooter>
                <FooterTab>
                    <MapsButton {...this.props} />
                    <FavouritesButton {...this.props} />
                </FooterTab>
            </NBFooter>
        );
    }
}

export default withNavigation(Footer);