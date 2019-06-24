import { isNil } from 'lodash';
import { Container, Content, Left, Text } from 'native-base';
import React from 'react';
import { FlatList } from 'react-native';

import App from '../../../app.json';
import Item from './item';

const sidebarList = [
    {
        name: 'Privacy Policy',
        route: 'privacy'
    },
];

class Sidebar extends React.Component {

    keyExtractor(item) {
        return item.route;
    }

    renderItem(item) {
        return (
            <Item item={item.item} />
        );
    }

    render() {
        return (
            <Container>
                <Content>
                    <FlatList
                        data={sidebarList}
                        initialNumToRender={sidebarList.length}
                        keyExtractor={this.keyExtractor}
                        renderItem={this.renderItem}
                    />
                    {
                        !isNil(App) &&
                        <Left>
                            <Text note>App Version {App.expo.version}</Text>
                            <Text note>Expo Version {App.expo.sdkVersion}</Text>
                        </Left>
                    }
                </Content>
            </Container>
        );
    }
}

export default Sidebar;