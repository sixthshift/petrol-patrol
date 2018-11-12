import _, { isEmpty, last, round } from 'lodash';
import { Card, CardItem, Container, Content, H1, Left, Right, Text } from 'native-base';
import React from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { VictoryChart, VictoryArea, VictoryLine, VictoryTheme } from 'victory';

import { fetchStatistics } from '../../actions';
import Footer from '../footer';
import Header from '../header';
import { encompassingRegion } from '../utils';
import { getSelectedFueltype, getStatistics } from '../../selectors';
import styles from './styles';

const emptyStatistics = {
    max: NaN,
    mean: NaN,
    median: NaN,
    min: NaN,
    stdev: NaN,
};

class Statistics extends React.Component {

    componentDidMount() {
        this.props.fetchStatistics(30);
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

    render() {
        const mostRecentStatistics = isEmpty(this.props.statistics) ? emptyStatistics : last(this.props.statistics);
        const data = [{ x: 1, y: 2 }, { x: 2, y: 4 }, { x: 3, y: 7 }, { x: 4, y: 1 }, { x: 5, y: 4 }, { x: 6, y: 7 }, { x: 7, y: 5 }, { x: 8, y: 9 }, { x: 9, y: 3 }, { x: 10, y: 7 }, { x: 11, y: 1 }];
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
                                <H1>{round(mostRecentStatistics.mean, 1)}</H1>
                            </Right>
                        </CardItem>
                    </Card>
                    <Card style={styles.card}>
                        <CardItem header>
                            <Text>Average Price History</Text>
                        </CardItem>
                        <CardItem>
                            {/* <VictoryChart
                                theme={VictoryTheme.material}
                            >
                                <VictoryLine
                                    data={data}
                                />
                            </VictoryChart> */}
                        </CardItem>
                    </Card>
                    <Card style={styles.card}>
                        <CardItem header>
                            <Text>Price Spread</Text>
                        </CardItem>
                        <CardItem>

                        </CardItem>
                    </Card>
                    <Card style={styles.card}>
                        <CardItem header>
                            <Text>Analysis</Text>
                        </CardItem>
                        <CardItem>

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