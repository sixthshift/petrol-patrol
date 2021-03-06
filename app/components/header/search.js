import { filter, isEmpty, isEqual, lowerCase, toString, trim } from 'lodash';
import { Header as NBHeader, Input, Icon, Item } from 'native-base';
import React from 'react';
import { ToastAndroid } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import { getStations } from '../../selectors';
import { noSearchResults, searchPlaceholder } from '../strings';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: ""
        };
        this.onChangeText = this.onChangeText.bind(this);
        this.search = this.search.bind(this);
    }

    onChangeText(query) {
        this.setState({ query: query });
    }

    search() {
        const query = lowerCase(trim(this.state.query));
        const results = filter(this.props.stations, (station) => {
            const suburb = lowerCase(trim(station.suburb));
            const postcode = toString(station.postcode);
            return isEqual(query, suburb) || isEqual(query, postcode);
        });
        if (isEmpty(results)) {
            ToastAndroid.show(noSearchResults, ToastAndroid.LONG);
        } else {
            this.props.content.onSearch(results);
        }
    }

    shouldComponentUpdate(nextProps) {
        return !isEqual(this.props, nextProps);
    }

    render() {
        return (
            <NBHeader rounded searchBar>
                <Item>
                    <Icon name='search' />
                    <Input
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.search}
                        placeholder={searchPlaceholder}
                    />
                </Item>
            </NBHeader>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        stations: getStations(state)
    };
};

export default withNavigation(connect(mapStateToProps)(Search));