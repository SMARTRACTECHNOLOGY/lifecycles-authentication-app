import React from 'react';
import { Button, StyleSheet } from 'react-native';
import { Screen } from '../components';
import theme from '../theme';

const styles = StyleSheet.create({
  screen: {
    backgroundColor: theme.color.darkBackground
  }
});

export default class AuthScreen extends React.Component {

  state = {
    isAuthenticating: false
  }

  navigateToScanScreen = () => {
    this.props.navigation.navigate('Scan');
  }

  handleAuthentication = (username, password) => {
    this.setState({ isAuthenticating: true });
    this.props.databroker.authenticate(username, password)
      .then((session) => {
        this.setState({ isAuthenticating: false });
        this.navigateToScanScreen();
      })
      .catch(console.error)
  }

  render(){
    const { isAuthenticating } = this.state;
    return (
      <Screen
        id="auth-screen"
        style={ styles.screen }
      >
        <Button
          title="Authing: Go to Scan"
          onPress={ this.handleAuthentication }
          disabled={ isAuthenticating }
        />
      </Screen>
    );
  }
}
