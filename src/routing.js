import React from 'react';
import { StackNavigator } from 'react-navigation';
import { handleNfef, bindNFC, unbindNFC } from './nfc';

// Just a single instance reference to use as a check for the NFC being bound/unbound
// We could also just use the transition screen potentially but this is a little bit easier for now
let bound = false;

/*
* Navigation abstraction that takes a `config` and renders a routing component
* For now this is a simple abstraction layer over `react-navigation` but we
* may eventually define all application transitions here from the `config`
*/
const configureRouting = (config) => StackNavigator(config, {
  headerMode: 'none',
  onTransitionStart: function(transitionProps, prevTransitionProps){
    const { index, routes } = transitionProps.navigation.state;
    const isScanScreen = routes[index].routeName === 'Scan';
    if(isScanScreen && !bound){
      bindNFC({ onTransition: transitionProps.navigation.navigate });
      bound = true;
    } else if(bound){
      unbindNFC();
      bound = false;
    }
  }
});

export const Navigator = ({ config }) => {
  const Navigator = configureRouting(config);
  return <Navigator />;
};
