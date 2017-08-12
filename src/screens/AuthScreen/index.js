import React from 'react';
import { ActivityIndicator, AsyncStorage, TextInput, View } from 'react-native';
import { Button, Login, Screen } from '../../components';
import theme from '../../theme';
import styles from './styles';

export default class AuthScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      error: undefined,
      username: '',
      isAuthenticating: false
    }
  }

  handleAuthenicationError = (err) => {
    this.setState({
      error: 'Invalid username or password',
      isAuthenticating: false
    });
  }

  handleAuthenicationSuccess = (username, jwt) => {
    this.setState({
      error: undefined,
      isAuthenticating: false
    });
    // Store session information and proceed to `Scan` screen
    const appState = JSON.stringify({ username, jwt });
    AsyncStorage.setItem(this.props.storageKey, appState)
      .then(() => {
        // Navigate to the scan screen
        this.props.navigation.navigate('Scan');
      });
  }

  signIn = (username, password) => {
    this.setState({
      isAuthenticating: true,
      username
    });
    this.props.databroker
      .authenticate(username, password)
      .then(this.handleAuthenicationSuccess.bind(this, username))
      .catch(this.handleAuthenicationError)
  }

  componentDidMount(){
    if(this.props.navigation.state.params){
      this.setState({ username: this.props.navigation.state.params.username})
    }
  }

  render(){
    const { error, username, isAuthenticating } = this.state;
    const loadingDisplay = isAuthenticating ? 'flex' : 'none';
    return (
      <Screen
        id="auth-screen"
        style={ styles.screen }
      >
        <View style={ [ styles.loading, { display: loadingDisplay }] }>
          <ActivityIndicator
            animating={ isAuthenticating }
            color={ theme.color.lightBackground }
            size={ theme.loading.size }
          />
        </View>
        <View style={ styles.login }>
          <Login
            error={ error }
            username={ username }
            onSubmit={ this.signIn }
          />
        </View>
      </Screen>
    );
  }
}
