import { Container, Content } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';

import Footer from '../footer';
import Header from '../header';
import List from '../list';
import { getFavourites } from '../../selectors/ui';

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
                    <List
                        data={this.props.favourites}
                    />
                </Content>
                <Footer />
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        favourites: getFavourites(state)
    };
};

export default connect(mapStateToProps)(Favourites);