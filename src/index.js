import React, { Component } from 'react';
import { Navigator } from './routing';
import Databroker from './databroker';
import { AuthScreen, ScanScreen, ScanDisplayScreen } from './screens';

const connect = (context, WrappedComponent) => {
  return class extends React.Component {
    render() {
      return <WrappedComponent {...this.props} {...context} />;
    }
  }
}

const withGlobals = (
  connect.bind(this, {
    databroker: new Databroker('http', '/', {
      authenticate: '/oauth',
      get: '/rest',
      put: '/rest',
      delete: '/rest',
      query: '/rest'
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
