import React, { Component } from 'react';
import Databroker from './lib/databroker';
import { Navigator } from './routing';
import { AuthScreen, ScanScreen, ScanDisplayScreen, SplashScreen } from './screens';

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
        status: '/users/me',
        authenticate: '/oauth/token?grant_type=password&scope=read',
        get: '/rest',
        put: '/rest',
        delete: '/rest',
        query: '/rest'
      },
      clientToken: process.env.client || 'smartcosmosservice:9HhnNDhfGEXfNEn6'
    })
  })
);

export default class LifecyclesAuthScan extends Component {

  constructor(){
    super();
    this.routeConfig = {
      Splash: { screen: withGlobals(SplashScreen) },
      Auth: { screen: withGlobals(AuthScreen) },
      Scan: { screen: withGlobals(ScanScreen) },
      Display: { screen: withGlobals(ScanDisplayScreen) }
    };
  }

  render() {
    return (
      <Navigator config={ this.routeConfig } />
    );
  }
}
