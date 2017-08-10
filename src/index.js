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

export default class LifecyclesAuthScan extends Component {

  constructor(){
    super();
    const context = {
      databroker: new Databroker('http', '/')
    };
    this.routeConfig = {
      Auth: { screen: connect(context, AuthScreen) },
      Scan: { screen: connect(context, ScanScreen) },
      Display: { screen: connect(context, ScanDisplayScreen) }
    };
  }


  render() {
    return (
      <Navigator config={ this.routeConfig } />
    );
  }
}
