import { filter, isEmpty, isEqual, lowerCase, toString, trim } from 'lodash';
import { Header as NBHeader, Input, Icon, Item } from 'native-base';
import React from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import { setRegionAction } from '../../actions';
import { getStations } from '../../selectors';
import { noSearchResults } from '../strings';

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

    render() {
        if (this.props.showSearch) {
            return (
                <NBHeader rounded searchBar>
                    <Item>
                        <Icon name='search' />
                        <Input
                            onChangeText={this.onChangeText}
                            onSubmitEditing={this.search}
                            placeholder='Search by Postcode or Suburb'
                        />
                    </Item>
                </NBHeader>
            );
        } else {
            return (null);
        }
    }
}

const mapStateToProps = (state) => {
    return {
        stations: getStations(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setRegion: (region) => {
            dispatch(setRegionAction(region))
        }
    };
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Search));