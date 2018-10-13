import { MapView } from 'expo';
import { Container } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';

class Details extends React.Component {

    render() {
        return (
            <Container />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        station: state.db.stations[ownProps.stationID]
    };
};

export default connect(mapStateToProps)(Details);