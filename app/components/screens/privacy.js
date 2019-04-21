import { Container } from 'native-base';
import React from 'react';
import { WebView } from 'react-native';

import Header from '../header';

class Privacy extends React.Component {

    render() {
        return (
            <Container>
                <Header
                    showBack={true}
                    showSearch={false}
                />

                <WebView
                    source={{
                        uri: 'https://sites.google.com/view/petrolpatrolprivacypolicy/home'
                    }}
                />

            </Container>
        );
    }
}

export default Privacy;