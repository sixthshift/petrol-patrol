import { first } from 'lodash';
import { Container } from 'native-base';
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';

import { initialiseDB } from './actions/db';
import { initialiseUI } from './actions/ui';;
import StackNavigator from './navigation/stack';
import Store from './store/index';
import Styles from './styles/styles';

class App extends React.Component {

    componentDidMount() {
        Store.dispatch(initialiseDB());
        const ui = {
            brands: Store.getState().db.brands,
            fueltype: first(Store.getState().db.fueltypes)
        };
        Store.dispatch(initialiseUI(ui));
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