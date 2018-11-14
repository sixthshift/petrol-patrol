import _, { first, isEmpty, isNaN, isUndefined, keys, last, round, size, values } from 'lodash';
import moment from 'moment';
import { Card, CardItem, Container, Content, H1, Left, Right, Text } from 'native-base';
import { LineChart } from 'react-native-chart-kit';
import React from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import { fetchStatistics, setRegionAction } from '../../actions';
import Colours from '../../constants/colours';
import Footer from '../footer';
import Header from '../header';
import { encompassingRegion } from '../utils';
import { getSelectedFueltype, getStatistics } from '../../selectors';
import styles from './styles';

const emptyStatistics = {
    distribution: {},
    max: NaN,
    mean: NaN,
    median: NaN,
    min: NaN,
    stdev: NaN,
};

const PriceHistoryChart = (props) => {
    if (isUndefined(props.width)) {
        return (null);
    }
    else if (isEmpty(props.data)) {
        return (null);
    } else {
        const sparseData = _(props.data).chunk(48).map((chunk) => {
            return first(chunk);
        }).value();
        const interval = size(sparseData) / props.chartConfig.nLabelX;
        const labels = _(sparseData).chunk(interval).map((chunk) => {
            const timestamp = first(chunk).timestamp;
            return moment.unix(timestamp).fromNow();
        }).value();
        const preparedData = _(sparseData).map('mean').value();
        const data = {
            labels: labels,
            datasets: [{
                data: preparedData,
            }],
        };
        return (
            <LineChart {...props} data={data} />
        );
    }
};

const PriceDistributionChart = (props) => {
    if (isUndefined(props.width)) {
        return (null);
    }
    else if (isEmpty(props.data.distribution)) {
        return (null);
    } else {
        const distributionKeys = keys(_(props.data).get('distribution'));
        const interval = size(distributionKeys) / props.chartConfig.nLabelX;
        const labels = _(distributionKeys).chunk(interval).map((chunk) => {
            return first(chunk);
        }).value();
        const preparedData = values(_(props.data).get('distribution'));
        const data = {
            labels: labels,
            datasets: [{
                data: preparedData,
            }],
        };
        return (
            <LineChart {...props} data={data} />
        );
    }
};

class Statistics extends React.Component {

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
        this.props.fetchStatistics(2 * 24 * 30);
    }

    onSearch = (stations) => {
        this.props.setRegion(encompassingRegion(stations));
        const action = StackActions.reset({
            actions: [NavigationActions.navigate({ routeName: 'maps' })],
            index: 0,
            key: null,
        });
        this.props.navigation.dispatch(action);
    }

    onLayout = (event) => {
        if (isUndefined(this.state.chartWidth)) {
            var { width } = event.nativeEvent.layout;
            this.setState({ chartWidth: width });
        }
    };

    render() {
        const mostRecentStatistics = isEmpty(this.props.statistics) ? emptyStatistics : last(this.props.statistics);
        return (
            <Container>
                <Header
                    content={this}
                    showBack={false}
                    showBrands={false}
                    showFueltypes={true}
                    showSearch={true}
                />
                <Content style={styles.content}>
                    <Card style={styles.card}>
                        <CardItem header>
                            <Text>Average Price</Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <H1>{this.props.fueltype}</H1>
                            </Left>
                            <Right>
                                <H1>{isNaN(mostRecentStatistics.mean) ? null : round(mostRecentStatistics.mean, 1)}</H1>
                            </Right>
                        </CardItem>
                    </Card>
                    <Card style={styles.card}>
                        <CardItem header>
                            <Text>Average Price History</Text>
                        </CardItem>
                        <CardItem>
                            <Content onLayout={this.onLayout}>
                                <PriceHistoryChart
                                    bezier
                                    chartConfig={this.chartConfig}
                                    data={this.props.statistics}
                                    height={this.state.chartHeight}
                                    width={this.state.chartWidth}
                                />
                            </Content>
                        </CardItem>
                    </Card>
                    <Card style={styles.card}>
                        <CardItem header>
                            <Text>Price Distribution</Text>
                        </CardItem>
                        <CardItem>
                            <Content onLayout={this.onLayout}>
                                <PriceDistributionChart
                                    bezier
                                    chartConfig={this.chartConfig}
                                    data={mostRecentStatistics}
                                    height={this.state.chartHeight}
                                    width={this.state.chartWidth}
                                />
                            </Content>
                        </CardItem>
                    </Card>
                    <Card style={styles.card}>
                        <CardItem header>
                            <Text>Analysis</Text>
                        </CardItem>
                        <CardItem>

                        </CardItem>
                        <CardItem footer>
                            <Text note>Sourced from NRMA</Text>
                        </CardItem>
                    </Card>
                </Content>
                <Footer />
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const props = {
        fueltype: getSelectedFueltype(state)
    };
    return {
        statistics: getStatistics(state, props),
        fueltype: getSelectedFueltype(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStatistics: (n) => {
            dispatch(fetchStatistics(n));
        },
        setRegion: (region) => {
            dispatch(setRegionAction(region));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);