import { isEmpty, isEqual, omit } from 'lodash';
import { Body, Container, Content } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';

import { reorderVisibleMarkerAction } from '../../actions';
import FlatList from '../flatlist';
import Header from '../header';
import { getVisibleStations } from '../../selectors';

const EmptyState = () => {
    return (null);
};

class List extends React.Component {

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps) {
        const before = omit(this.props, ['prices']);
        const after = omit(nextProps, ['prices']);
        return !isEqual(before, after);
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
                    showSortByDistance={false}
                    showSortByPrice={false}
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
    const visible = getVisibleStations(state);
    return {
        visible: visible,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        reorder: (visible) => {
            dispatch(reorderVisibleMarkerAction(visible));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);