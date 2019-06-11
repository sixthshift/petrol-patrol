import { Container, Content } from 'native-base';
import React from 'react';
import { FlatList } from 'react-native';

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
                </Content>
            </Container>
        );
    }
}

export default Sidebar;