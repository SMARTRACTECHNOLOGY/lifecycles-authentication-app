import React, { Component } from 'react';
import Databroker from './lib/databroker';
import { Navigator } from './routing';
import { AuthScreen, ScanScreen, ScanDisplayScreen } from './screens';

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
    databroker: new Databroker({
      type: 'http',
      base: process.env.base || 'https://beta.lifecycles.io',
      mapping: {
        authenticate: process.env.auth || '/oauth/token?grant_type=password&scope=read',
        get: process.env.api || '/rest',
        put: process.env.api || '/rest',
        delete: process.env.api || '/rest',
        query: process.env.api || '/rest'
      },
      clientToken: process.env.client || 'smartcosmosservice:9HhnNDhfGEXfNEn6'
    })
  })
);

export default class LifecyclesAuthScan extends Component {

  constructor(){
    super();
    this.routeConfig = {
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
