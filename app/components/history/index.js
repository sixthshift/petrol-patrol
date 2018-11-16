import { isEmpty, isUndefined, times } from 'lodash';
import { Card, CardItem, Container, Content } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';

import Chart from './chart';
import Colours from '../../constants/colours';
import Header from '../header';
import styles from './styles';

const PriceChart = (props) => {
    if (isUndefined(props.width)) {
        return (null);
    }
    else if (isEmpty(props.data)) {
        return (null);
    } else {
        const preparedData = props.data;
        const data = {
            labels: [],
            datasets: [{
                data: preparedData,
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

    onLayout = (event) => {
        if (isUndefined(this.state.chartWidth)) {
            var { width } = event.nativeEvent.layout;
            this.setState({ chartWidth: width });
        }
    };

    render() {
        const data = times(1000, (i) => (i));
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
                                    data={data}
                                    height={this.state.chartHeight}
                                    width={this.state.chartWidth}
                                />
                            </Content>
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