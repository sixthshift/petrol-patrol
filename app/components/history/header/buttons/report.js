import { Linking } from 'expo';
import { Button, Icon } from 'native-base';
import { stringify } from 'query-string';
import React from 'react';
import { withNavigation } from 'react-navigation';

import { now } from '../../../../utils';

const ReportButton = (props) => {
    const onReportPress = () => {
        const baseURL = 'https://www.cas.fairtrading.nsw.gov.au/icmspublicweb/forms/FuelCheck.html';
        const query = {
            FuelType: props.navigation.state.params.fueltype,
            Price: props.navigation.state.params.price.price,
            Date: now().format('DD/MM/YYYY'),
            Time: now().format('h:mmA'),
            SS: props.navigation.state.params.station.name
                + ' ' + props.navigation.state.params.station.street
                + ' ' + props.navigation.state.params.station.suburb
                + ' ' + props.navigation.state.params.station.state
                + ' ' + props.navigation.state.params.station.postcode,
        };
        const queryString = stringify(query);
        Linking.openURL(baseURL + '?' + queryString);
    }
    return (
        <Button transparent onPress={onReportPress}>
            <Icon type="MaterialIcons" name="error-outline" />
        </Button>
    );
};

export default withNavigation(ReportButton);