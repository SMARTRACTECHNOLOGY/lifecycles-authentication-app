import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  AppRegistry,
  AsyncStorage,
  Platform,
  Text,
  View
} from 'react-native';
import { Button, Screen } from '../../components';
import theme from '../../theme';
import styles from './styles';


export default class AuthScreen extends React.Component {
  constructor(props) {
    super(props);
    this.getExisting()
    this.state = {
      jwt: null,
      isAuthenticating: true
    };
  }

  getExisting = () => {
    AsyncStorage.getItem(this.props.storageKey).then((value) => {
      const { jwt } = JSON.parse(value)
      this.setState({ jwt, isAuthenticating: false })
      if (jwt) {
        this.props.navigation.navigate('Scan');
      } else {
        this.onLogin()
      }
    })
  }

  handleAuthenticationSuccess = ({ accessToken }) => {
    this.setState({ jwt: accessToken, isAuthenticating: false });
    AsyncStorage.mergeItem(this.props.storageKey, JSON.stringify({ jwt: accessToken }))
      .then(() => {
        // Navigate to the scan screen
        this.props.navigation.navigate('Dashboard');
      });
  }
  handleAuthenicationError = error => {
    this.setState({ isAuthenticating: false })
    console.log(error)
  }

  onLogin = () => {
      this.props.databroker.authenticate()
        .then(this.handleAuthenticationSuccess.bind(this))
        .catch(this.handleAuthenicationError.bind(this));
  };

  render() {
    const loadingDisplay = this.state.isAuthenticating ? 'flex' : 'none';
    return (
      <Screen
        id="auth-screen"
        style={ styles.screen }
      >
        <View style={ [ styles.loading, { display: loadingDisplay }] }>
          <ActivityIndicator
            animating={ this.state.isAuthenticating }
            color={ theme.color.lightBackground }
            size={ theme.loading.size }
          />
        </View>
        <View style={ styles.container }>
          <Text style={styles.header}> You will be redirected for authentication.</Text>
          <Text style={styles.subtext}>{ "Please click the login button if the page doesn't load automatically" }</Text>
          <Button
            onPress={ this.onLogin }
            style={ styles.button }
            title="Log In"
          />
        </View>
      </Screen>
    );
  }
}
