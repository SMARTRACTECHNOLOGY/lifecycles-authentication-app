import React from 'react';
import { StackNavigator } from 'react-navigation';

/*
* Navigation abstraction that takes a `config` and renders a routing component
* For now this is a simple abstraction layer over `react-navigation` but we
* may eventually define all application transitions here from the `config`
*/
const configureRouting = (config) => StackNavigator(config, { headerMode: 'none' });

export const Navigator = ({ config }) => {
  const Navigator = configureRouting(config);
  return <Navigator />;
};
