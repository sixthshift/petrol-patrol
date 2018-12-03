import moment from 'moment';
import { Body, Left, ListItem, Right, Text, H1 } from 'native-base';
import React from 'React';
import { View } from 'react-native';

class PriceListItem extends React.Component {

    render() {
        const readableTime = moment.unix(this.props.item.timestamp).format('DD MMMM YYYY');
        return (
            <View>
                <ListItem>
                    <Left>
                        <Body>
                            <H1>{this.props.item.price}</H1>
                            <Text note>{readableTime}</Text>
                        </Body>
                    </Left>
                    <Right>

                    </Right>
                </ListItem>
            </View>
        );
    }
}

export default PriceListItem;