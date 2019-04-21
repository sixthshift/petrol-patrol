import { Left, ListItem, Right, Text } from 'native-base';
import React from 'react';
import { withNavigation } from 'react-navigation';

class Item extends React.Component {

    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
    }

    onPress() {
        this.props.navigation.navigate(this.props.item.route);
    }

    render() {
        return (
            <ListItem
                onPress={this.onPress}
                noBorder
            >
                <Left>
                    <Text>{this.props.item.name}</Text>
                </Left>
            </ListItem>
        );
    }
}

export default withNavigation(Item);