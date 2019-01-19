import { Container, Content } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';

import FlatList from '../flatlist';
import Header from '../header';

const EmptyState = () => {
    return (null);
};

class List extends React.Component {

    sort() {

    }

    render() {
        return (
            <Container>
                <Header
                    content={this}
                    showBack={true}
                    showBrands={true}
                    showFueltypes={true}
                    showSearch={false}
                />
                <Content>
                    <FlatList />
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    };
};

export default connect(mapStateToProps)(List);