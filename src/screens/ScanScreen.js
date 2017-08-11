import React from 'react';
import { AsyncStorage, Button, Image, StyleSheet, View } from 'react-native';
import { NavHeader, Screen } from '../components';
import theme from '../theme';

const styles = StyleSheet.create({
  screen: {
    backgroundColor: theme.color.lightBackground
  },
  icon: {
    width: 24,
    height: 24
  }
});

export default class ScanScreen extends React.Component {

  navigateToScanDisplay = () => {
    this.props.navigation.navigate('Display');
  }

  handleLogout = () => {
    this.props.databroker.logout()
      .then(() => {
        const navigateToAuth = () => this.props.navigation.navigate('Auth');
        AsyncStorage.getItem(this.props.storageKey, (err, result) => {
          // Remove jwt from storage but keep everything else
          const { jwt, ...rest } = JSON.parse(result);
          AsyncStorage.setItem(this.props.storageKey, JSON.stringify(rest))
            .then(navigateToAuth)
            .catch(() => AsyncStorage.clear().then(navigateToAuth))
        });
      });
  }

  render(){
    return (
      <Screen
        id="scan-screen"
        header={ <NavHeader onLogout={ this.handleLogout } /> }
      >
        <Button
          title="Scanning: Go to Display"
          onPress={ this.navigateToScanDisplay }
        />
        <Button
          title="Drawer"
          onPress={ () => this.props.navigation.navigate('DrawerOpen') }
        />
      </Screen>
    );
  }
}
