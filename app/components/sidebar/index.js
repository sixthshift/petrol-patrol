import { Container, Content, List } from 'native-base';
import React from 'react';

import Item from './item';

const data = [
    {
        name: 'Privacy Policy',
        route: 'privacy'
    },
];

class Sidebar extends React.Component {

    renderItem(item) {
        return (<Item
            item={item}
        />);
    }

    render() {
        return (
            <Container>
                <Content>
                    <List
                        dataArray={data}
                        renderRow={this.renderItem}
                    />
                </Content>
            </Container>
        );
    }
}

export default Sidebar;