import { Card, CardItem, Container, Content } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';

import Header from '../header';

class History extends React.Component {

    render() {
        return (
            <Container>
                <Header
                    showBack={true}
                />
                <Content>
                    <Card>
                        <CardItem>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {

    };
};

export default connect(mapStateToProps)(History);