import React from 'react';
import { ToastAndroid, View } from 'react-native';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { __REMOTEDEV__ } from './constants/app';
import { remoteDevEnabled } from './components/strings';
import StackNavigator from './navigation/stack';
import store, { persistor } from './store';
import Styles from './styles/styles';
import { createAppContainer } from 'react-navigation';

const RootNavigator = createAppContainer(StackNavigator);

class App extends React.Component {

    constructor(props) {
        super(props);
        if (__REMOTEDEV__) {
            ToastAndroid.show(remoteDevEnabled, ToastAndroid.LONG);
        }
    }

    render() {
        return (
            <StoreProvider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <View style={Styles.root}>
                        <RootNavigator />
                    </View>
                </PersistGate>
            </StoreProvider>
        );
    }
}

export default App;