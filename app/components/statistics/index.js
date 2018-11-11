import React from 'react';
import { Container, Content } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';

import Footer from '../footer';
import Header from '../header';
import { encompassingRegion } from '../utils';

class Statistics extends React.Component {

    onSearch = (stations) => {
        this.props.setRegion(encompassingRegion(stations));
        const action = StackActions.reset({
            actions: [NavigationActions.navigate({ routeName: 'maps' })],
            index: 0,
            key: null,
        });
        this.props.navigation.dispatch(action);
    }

    render() {
        return (
            <Container>
                <Header
                    content={this}
                    showBack={false}
                    showBrands={true}
                    showFueltypes={true}
                    showSearch={true}
                />
                <Content>

                </Content>
                <Footer
                />
            </Container>
        );
    }
}

export default Statistics;