import { KeepAwake, registerRootComponent } from 'expo';
import App from './app/app';

if (__DEV__) {
  KeepAwake.activate();
}

registerRootComponent(App);
