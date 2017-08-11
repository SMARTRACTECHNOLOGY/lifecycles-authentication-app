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
    this.props.navigation.navigate('Scan');
    AsyncStorage.setItem(this.props.storageKey, JSON.stringify({ username, jwt }));
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

  loadStorage = () => {
    AsyncStorage.getItem(this.props.storageKey)
      .then((data) => {
        if(data){
          const parsedData = JSON.parse(data);
          if(parsedData.jwt){
            this.props.databroker.authenticateToken(parsedData.jwt);
            this.props.navigation.navigate('Scan');
          }
          this.setState(parsedData);
        }
      })
  }

  componentDidMount(){
    this.loadStorage();
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
