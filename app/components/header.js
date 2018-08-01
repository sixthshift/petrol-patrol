import { Font, AppLoading } from "expo";
import { Button, Header, Input, Icon, Item, Left, Right, Spinner, Text, Title } from 'native-base';
import React from 'react';
import { View } from 'react-native';

export default class SearchHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = { ready: false };
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
                <Header>
                    <Right>
                        <Button transparent>
                            <Icon type="MaterialIcons" name="local-gas-station" />
                        </Button>
                        <Button transparent>
                            <Icon type="Entypo" name="drop" />
                        </Button>
                    </Right>
                </Header>
                <Header searchBar rounded>
                    <Item>
                        <Icon name="search" />
                        <Input placeholder="Search" />
                    </Item>
                </Header>
            </View>
        );
    }
}