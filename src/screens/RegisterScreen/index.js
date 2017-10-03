import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Button, Register, NavHeader, Screen } from '../../components';
import theme from '../../theme';
import styles from './styles';

export default class RegisterScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error: null,
      isAuthenticating: false
    }
  }

  handleRegistrationSuccess () {
    this.setState({
      error: undefined,
      isAuthenticating: false
    });
    this.props.navigation.navigate('Scan');
  }

  handleRegistrationFailure (error) {
    this.setState({
      error: error,
      isAuthenticating: false
    });
  }

  register ({ ...productInfo }) {
    this.setState({
      isAuthenticating: true
    });
    const { code } = this.props.navigation.state.params.data
    const { appId, customerId } = this.props;
    const data = { appId, customerId, code, ...productInfo }
    console.log(data)
    // Todo: Call endpoint to register
  }

  render () {
    const { error, username, isAuthenticating } = this.state;
    const loadingDisplay = isAuthenticating ? 'flex' : 'none';
    const canGoBack = true
    const props = { canGoBack, ...this.props }
    return (
      <Screen
        id="register-screen"
        style={ styles.screen }
        header={ <NavHeader { ...props } /> }
      >
        <Text style={ styles.title }>Describe Product</Text>
        <View style={ [ styles.loading, { display: loadingDisplay }] }>
          <ActivityIndicator
            animating={ isAuthenticating }
            color={ theme.color.lightBackground }
            size={ theme.loading.size }
          />
        </View>
        <View style={ styles.register }>
          <Register
            error={ error }
            onSubmit={ this.register }
          />
        </View>
      </Screen>
    );
  }
}