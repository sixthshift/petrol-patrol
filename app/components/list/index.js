import { isEmpty } from 'lodash';
import { Body, Container, Content } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';

import FlatList from '../flatlist';
import Header from '../header';
import { getVisibleMarkers } from '../../selectors';

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
                    {isEmpty(this.props.visible) ? (
                        <Body>
                            <EmptyState />
                        </Body>
                    ) : (
                            <FlatList
                                data={this.props.visible}
                            />
                        )
                    }
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        visible: getVisibleMarkers(state)
    };
};

export default connect(mapStateToProps)(List);