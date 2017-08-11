import React from 'react';
import { Button, Image, StyleSheet, View } from 'react-native';
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
      .then((loggedOut) => {
        if(loggedOut){
          this.props.navigation.navigate('Auth');
        }
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
