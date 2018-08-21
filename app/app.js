import { first } from 'lodash';
import { Container } from 'native-base';
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';

import { fetchBrands, fetchFueltypes } from './actions';
import StackNavigator from './navigation/stack';
import Store from './store';
import Styles from './styles/styles';

class App extends React.Component {

    componentDidMount() {
        Store.dispatch(fetchBrands());
        Store.dispatch(fetchFueltypes());
    }

    render() {
        return (
            <StoreProvider store={Store}>
                <Container style={Styles.root}>
                    <StackNavigator />
                </Container>
            </StoreProvider>
        );
    }
}

export default App;