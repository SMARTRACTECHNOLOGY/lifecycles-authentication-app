import React from 'react';
import { AlertIOS, Platform, Text, ToastAndroid, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { LoadingIndicator, NavHeader, Screen, Registration } from '../../components';
import styles from './styles';

export default class RegisterScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error: null,
      isRegistering: false
    }
    this.errors = {
      register: 'Cannot Register Tag at this time. Please Try Again.'
    };
  }

  handleRegistrationSuccess = (response) => {
    const message = this.isUpdate() ? 'Registration Updated' : 'NFC Tag has Registered';
    if (Platform.OS === 'ios') {
      AlertIOS.alert( 'Register Complete', message);
    } else {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
    // Add slight delay for ES to have record saved
    setTimeout(() => {
      this.setState({
        error: undefined,
        isRegistering: false
      }, () => this.props.navigation.navigate('Registrations'));
    }, 500);
  }

  handleRegistrationFailure = (error) => {
    this.setState({
      error: this.errors.register,
      isRegistering: false
    });
  }

  isUpdate = () => {
    return !!this.props.navigation.state.params.registration;
  }

  register = ({ ...productInfo }) => {
    this.setState({
      isRegistering: true
    });
    const { applicationId, databroker, navigation } = this.props;
    const { tid, product: { imageUrl }} = navigation.state.params;
    const { email } = databroker.backend.context();
    const data = {
      customerId: email,
      applicationId,
      tid,
      imageUrl,
      ...productInfo
    };
    // Perform registration put
    databroker.put('registration', data)
      .then(this.handleRegistrationSuccess)
      .catch(this.handleRegistrationFailure)
  }

  render(){
    const { error, isRegistering } = this.state;
    const { navigation } = this.props;
    return (
      <Screen
        id="register-screen"
        style={ styles.screen }
        header={
          <NavHeader
            canGoBack={ true }
            { ...this.props }
          />
        }
      >
        <LoadingIndicator showing={ isRegistering } />
        <Registration
          title="Register Product"
          error={ error }
          onSubmit={ this.register }
          initialValues={ navigation.state.params }
          isUpdate={ this.isUpdate() }
        />
      </Screen>
    );
  }
}
