import { Container, Content } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';

import Footer from '../footer';
import Header from '../header';

class Favourites extends React.Component {
    render() {
        return (
            <Container>
                <Header
                    showBack={false}
                    showBrands={true}
                    showFueltypes={true}
                    showSearch={true}
                />
                <Content>
                    
                </Content>
                <Footer/>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    };
};

export default connect(mapStateToProps)(Favourites);