import React from 'react';
import { View } from 'react-native';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import StackNavigator from './navigation/stack';
import store, { persistor } from './store';
import Styles from './styles/styles';

class App extends React.Component {

    render() {
        return (
            <StoreProvider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <View style={Styles.root}>
                        <StackNavigator />
                    </View>
                </PersistGate>
            </StoreProvider>
        );
    }
}

export default App;