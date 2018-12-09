import { isEmpty, isNaN, isUndefined, last, map, round, size } from 'lodash';
import { Card, CardItem, Container, Content, H1, Left, Right, Text } from 'native-base';
import React from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import { fetchAnalysis, fetchStatistics, setRegionAction } from '../../actions';
import DistributionChart from './chart/distribution';
import HistoryChart from './chart/history';
import { statisticsHistoryRange } from '../../constants/app';
import Colours from '../../constants/colours';
import Footer from '../footer';
import Header from '../header';
import { encompassingRegion } from '../utils';
import { getSelectedFueltype, getStatistics, getAnalysis } from '../../selectors';
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
                            <Left>
                                <Text>Average</Text>
                            </Left>
                            <Right>
                                <Text>Deviation</Text>
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
                                <Text>Min</Text>
                            </Left>
                            <Right>
                                <Text>Max</Text>
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
                            <Text>Price History</Text>
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
                            <Text>Price Distribution</Text>
                        </CardItem>
                        <CardItem>
                            <Content onLayout={this.onLayout}>
                                <DistributionChart
                                    data={mostRecentStatistics}
                                />
                            </Content>
                        </CardItem>
                    </Card>
                    <Card style={styles.card}>
                        <CardItem>
                            {map(this.props.analysis, (line, i) => (
                                <Text key={i}>{line}</Text>
                            ))}
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
    const fueltype = getSelectedFueltype(state);
    const props = {
        fueltype: fueltype,
    };
    return {
        analysis: getAnalysis(state),
        fueltype: fueltype,
        statistics: getStatistics(state, props),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAnalysis: () => {
            dispatch(fetchAnalysis());
        },
        fetchStatistics: (n) => {
            dispatch(fetchStatistics(n));
        },
        setRegion: (region) => {
            dispatch(setRegionAction(region));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);