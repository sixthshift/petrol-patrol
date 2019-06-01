import { Header as NBHeader, Left, Right } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';

import { BackButton, BrandsButton, DrawerButton, FueltypesButton, ListButton, ReportButton, SortDistanceButton, SortPriceButton } from './buttons';
import Search from './search';

class Header extends React.Component {

    static defaultProps() {
        return {
            showBack: true,
            showBrands: false,
            showFueltypes: false,
            showList: false,
            showSearch: false,
            showSortByDistance: false,
            showSortByPrice: false,
        };
    }

    render() {
        return (
            <View>
                <NBHeader>
                    <Left>
                        <BackButton />
                        <DrawerButton />
                    </Left>
                    <Right>
                        <ReportButton {...this.props} />
                        <FueltypesButton />
                        <BrandsButton {...this.props} />
                        <ListButton {...this.props} />
                        <SortDistanceButton {...this.props} />
                        <SortPriceButton {...this.props} />
                    </Right>
                </NBHeader>
                <Search {...this.props} />
            </View>
        );
    }
}


export default withNavigation((Header));
