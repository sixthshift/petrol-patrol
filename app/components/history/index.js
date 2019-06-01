import { Card, CardItem, Container, Content } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';

import { fetchPriceHistory } from '../../actions';
import { priceHistoryRange } from '../../constants/app';
import Chart from './chart';
import Header from './header';
import PriceList from './price';
import { getPriceHistory } from '../../selectors';
import styles from './styles';
import { now } from '../../utils';

class History extends React.Component {

    componentDidMount() {
        const timestamp = now().subtract(priceHistoryRange, 'days').unix();
        this.props.fetchPriceHistory(this.props.station, this.props.fueltype, timestamp);
    }

    render() {
        return (
            <Container>
                <Header
                    content={this}
                />
                <Content style={styles.content}>
                    <Card style={styles.card}>
                        <CardItem>
                            <Content>
                                <Chart
                                    data={this.props.prices}
                                />
                            </Content>
                        </CardItem>
                    </Card>
                    <Card style={styles.card}>
                        <PriceList list={this.props.prices} />
                    </Card>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const props = ownProps.navigation.state.params;
    return {
        prices: getPriceHistory(state, props),
        ...props,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPriceHistory: (station, fueltype, timestamp) => {
            dispatch(fetchPriceHistory(station, fueltype, timestamp));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(History);