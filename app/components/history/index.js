import { isEmpty, isUndefined, map } from 'lodash';
import moment from 'moment';
import { Card, CardItem, Container, Content } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';

import { fetchPriceHistory } from '../../actions';
import { priceHistoryRange } from '../../constants/app';
import Chart from './chart';
import Colours from '../../constants/colours';
import Header from '../header';
import PriceList from './price';
import { getPriceHistory } from '../../selectors';
import styles from './styles';
import { accumulatedRatio } from './utils';

const PriceChart = (props) => {
    if (isUndefined(props.width)) {
        return (null);
    }
    else if (isEmpty(props.data)) {
        return (null);
    } else {
        const preparedData = map(props.data, 'price');
        const ratio = accumulatedRatio(map(props.data, 'timestamp'));
        const data = {
            labels: [],
            datasets: [{
                data: preparedData,
                ratio: ratio,
            }],
        };
        return (
            <Chart {...props} data={data} />
        );
    }
};

class History extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chartWidth: undefined,
            chartHeight: 250
        };
        this.chartConfig = {
            backgroundGradientFrom: '#FFFFFF',
            backgroundGradientTo: '#FFFFFF',
            color: () => (Colours.primary),
            nLabelX: 3,
        };
    }

    componentDidMount() {
        const timestamp = moment().subtract(priceHistoryRange, 'days').unix();
        this.props.fetchPriceHistory(this.props.station, this.props.fueltype, timestamp);
    }

    onLayout = (event) => {
        if (isUndefined(this.state.chartWidth)) {
            var { width } = event.nativeEvent.layout;
            this.setState({ chartWidth: width });
        }
    };

    render() {
        return (
            <Container>
                <Header
                    showBack={true}
                />
                <Content style={styles.content}>
                    <Card style={styles.card}>
                        <CardItem>
                            <Content onLayout={this.onLayout}>
                                <PriceChart
                                    chartConfig={this.chartConfig}
                                    data={this.props.prices}
                                    height={this.state.chartHeight}
                                    width={this.state.chartWidth}
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