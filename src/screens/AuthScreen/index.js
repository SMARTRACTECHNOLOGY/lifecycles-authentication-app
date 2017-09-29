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
import Auth0 from 'react-native-auth0';
import theme from '../../theme';
import styles from './styles';

var credentials = require('./auth0-credentials');
const auth0 = new Auth0(credentials);

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

  onLogin = () => {
    auth0.webAuth
      .authorize({
        scope: 'openid profile',
        audience: 'https://' + credentials.domain + '/userinfo'
      })
      .then(({ accessToken }) => {
        this.setState({ jwt: accessToken, isAuthenticating: false });
        AsyncStorage.mergeItem(this.props.storageKey, JSON.stringify({ jwt: accessToken }))
          .then(() => {
            this.props.navigation.navigate('Scan');
          });
      })
      .catch(error => {
        this.setState({ isAuthenticating: false })
        console.log(error)
      });
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
          <Text style={styles.subtext}> Please click the login button if the page doesn't load automatically</Text>
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

