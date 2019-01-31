import { isEqual, isNil, isUndefined } from 'lodash';
import moment from 'moment';
import { Body, Left, ListItem, Right, Text, H1 } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import { fetchPrice } from '../../../actions';
import styles from './styles';
import { getPrice, getMostRecentStatistics } from '../../../selectors';
import { colour } from '../../utils';

class PriceListItem extends React.Component {

    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
    }

    componentDidMount() {
        if (isUndefined(this.props.price)) {
            this.props.fetchPrice(this.props.station, this.props.item.code);
        }
    }

    onPress() {
        const props = {
            station: this.props.station,
            fueltype: this.props.price.fueltype,
        };
        this.props.navigation.navigate('history', props);
    }

    shouldComponentUpdate(nextProps) {
        return !isEqual(this.props, nextProps);
    }

    render() {
        if (isNil(this.props.price)) {
            return (null);
        } else {
            const timeDifference = moment.unix(this.props.price.timestamp).fromNow();
            return (
                <View style={{ ...styles.bar, backgroundColor: colour(this.props.price, this.props.statistics) }}>
                    <ListItem onPress={this.onPress} style={styles.item}>
                        <Left style={styles.left}>
                            <Body>
                                <H1>{this.props.price.price}</H1>
                                <Text note>Last updated {timeDifference}</Text>
                            </Body>
                        </Left>
                        <Right style={styles.right}>
                            <Body>
                                <H1>{this.props.item.code}</H1>
                                <Text note>{this.props.item.name}</Text>
                            </Body>
                        </Right>
                    </ListItem>
                </View>
            );
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const props = { ...ownProps, fueltype: ownProps.item.code };
    return {
        price: getPrice(state, props),
        statistics: getMostRecentStatistics(state, props),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPrice: (stationID, fueltype) => {
            dispatch(fetchPrice(stationID, fueltype));
        }
    };
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(PriceListItem));