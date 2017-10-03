import React, { Component } from 'react';
import { Platform } from 'react-native';
import Databroker from './lib/databroker';
import { Navigator } from './routing';
import {
  AuthScreen,
  DashboardScreen,
  RegistrationsScreen,
  ScanScreen,
  ScanDisplayScreen,
  SplashScreen,
  ScanScreenIOS
} from './screens';

/*
* Display scan screen based on platform
*/
const ScanScreenX = (Platform.OS === 'ios') ? ScanScreenIOS : ScanScreen

/*
* Higher-order component that passes in a context mapping
*/
const connect = (context, WrappedComponent) => {
  return class extends React.Component {
    render() {
      return <WrappedComponent { ...this.props } { ...context } />;
    }
  }
};

/*
* Returns a function that binds a global context to the `connect` function
*/
const withGlobals = (
  connect.bind(this, {
    storageKey: '@smartrac-lifecycles-auth-app:appState',
    databroker: new Databroker({
      type: 'http',
      base: process.env.base || 'https://beta.lifecycles.io',
      mapping: {
        base: '/utilize/v1'
      }
    })
  })
);

export default class LifecyclesAuthScan extends Component {

  constructor(){
    super();
    this.routeConfig = {
      Splash: { screen: withGlobals(SplashScreen) },
      Auth: { screen: withGlobals(AuthScreen) },
      Scan: { screen: withGlobals(ScanScreenX) },
      Display: { screen: withGlobals(ScanDisplayScreen) },
      Dashboard: { screen: withGlobals(DashboardScreen) },
      Registrations: { screen: withGlobals(RegistrationsScreen) },
    };
  }

  render() {
    return (
      <Navigator config={ this.routeConfig } />
    );
  }
}
