import { get, isEmpty, isNaN, isUndefined, last, round, size } from 'lodash';
import moment from 'moment';
import { Card, CardItem, Container, Content, Drawer, H1, Left, Right, Text } from 'native-base';
import React from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import { fetchAnalysis, fetchStatisticsByDay, setRegionAction } from '../../actions';
import DistributionChart from './chart/distribution';
import HistoryChart from './chart/history';
import { enableAnalysisNRMA, statisticsHistoryRange } from '../../constants/app';
import Colours from '../../constants/colours';
import Footer from '../footer';
import Header from '../header';
import { encompassingRegion } from '../../utils';
import { getSelectedFueltype, getStatisticsForFueltype, getAnalysis } from '../../selectors';
import { averageLabel, deviationLabel, maximumLabel, minimumLabel } from '../strings';
import styles from './styles';

const emptyStatistics = {
    distribution: {},
    max: NaN,
    mean: NaN,
    median: NaN,
    min: NaN,
    stdev: NaN,
};

const dataPoints = statisticsHistoryRange;

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
        if (size(this.props.statistics) < dataPoints) {
            this.props.fetchStatistics(dataPoints);
        }
        if (isEmpty(this.props.analysis)) {
            this.props.fetchAnalysis();
        }
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
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
            >
                <Container>
                    <Header
                        content={this}
                        showBack={false}
                        showBrands={false}
                        showDrawer={true}
                        showFueltypes={true}
                        showSearch={true}
                    />
                    <Content style={styles.content}>
                        <Card style={styles.card}>
                            <CardItem header>
                                <Left>
                                    <Text>{averageLabel}</Text>
                                </Left>
                                <Right>
                                    <Text>{deviationLabel}</Text>
                                </Right>
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <H1>{isNaN(mostRecentStatistics.mean) ? null : round(mostRecentStatistics.mean, 1)}</H1>
                                </Left>
                                <Right>
                                    <H1>{isNaN(mostRecentStatistics.stdev) ? null : round(mostRecentStatistics.stdev, 1)}</H1>
                                </Right>
                            </CardItem>
                            <CardItem header>
                                <Left>
                                    <Text>{minimumLabel}</Text>
                                </Left>
                                <Right>
                                    <Text>{maximumLabel}</Text>
                                </Right>
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <H1>{isNaN(mostRecentStatistics.min) ? null : round(mostRecentStatistics.min, 1)}</H1>
                                </Left>
                                <Right>
                                    <H1>{isNaN(mostRecentStatistics.max) ? null : round(mostRecentStatistics.max, 1)}</H1>
                                </Right>
                            </CardItem>
                        </Card>
                        <Card style={styles.card}>
                            <CardItem header>
                                <Content>
                                    <Text>Average Price History</Text>
                                    <Text note>Average price trends over the last {statisticsHistoryRange} days</Text>
                                </Content>
                            </CardItem>
                            <CardItem>
                                <Content onLayout={this.onLayout}>
                                    <HistoryChart
                                        data={this.props.statistics}
                                    />
                                </Content>
                            </CardItem>
                        </Card>
                        <Card style={styles.card}>
                            <CardItem header>
                                <Content>
                                    <Text>Price Distribution</Text>
                                    <Text note>Current spread of prices seen at service stations across the state</Text>
                                </Content>
                            </CardItem>
                            <CardItem>
                                <Content onLayout={this.onLayout}>
                                    <DistributionChart
                                        data={mostRecentStatistics}
                                    />
                                </Content>
                            </CardItem>
                        </Card>
                        {
                            enableAnalysisNRMA &&
                            <Card style={styles.card}>
                                <CardItem>
                                    <Text>{get(this.props.analysis, 'data')}</Text>
                                </CardItem>
                                <CardItem footer>
                                    <Text note>
                                        {"Sourced from NRMA\nFetched " + moment.unix(get(this.props.analysis, 'timestamp')).fromNow()}
                                    </Text>
                                </CardItem>
                            </Card>
                        }
                    </Content>
                    <Footer />
                </Container>
            </Drawer>
        );
    }
}

const mapStateToProps = (state) => {
    const fueltype = getSelectedFueltype(state);
    const props = { fueltype };
    return {
        analysis: getAnalysis(state),
        fueltype: fueltype,
        statistics: getStatisticsForFueltype(state, props),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAnalysis: () => {
            dispatch(fetchAnalysis());
        },
        fetchStatistics: (n) => {
            dispatch(fetchStatisticsByDay(n));
        },
        setRegion: (region) => {
            dispatch(setRegionAction(region));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);