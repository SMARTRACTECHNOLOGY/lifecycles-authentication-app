import React from 'react';
import { ActivityIndicator, AlertIOS, AsyncStorage, Image, Platform, Text, ToastAndroid, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { NavHeader, Screen, Registration} from '../../components';
import styles from './styles';
import theme from '../../theme';

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
    this.setState({
      error: undefined,
      isRegistering: false
    });
    if (Platform.OS === 'ios') {
      AlertIOS.alert(
        "Register Complete",
        "NFC Tag has been Registered"
      );
    } else {
      ToastAndroid.show('NFC Tag Registered', ToastAndroid.SHORT);
    }
    this.props.navigation.navigate('Dashboard');
  }

  handleRegistrationFailure = (error) => {
    this.setState({
      error: this.errors.register,
      isRegistering: false
    });
  }

  register = ({ ...productInfo }) => {
    this.setState({
      isRegistering: true
    });
    const { code, product:{ imageUrl } } = this.props.navigation.state.params.data
    const { appId } = this.props;
    const { email } = this.props.databroker.backend.context()
    const data = { applicationId: appId, customerId: email, tid:code, imageUrl, ...productInfo }

    this.props.databroker.put("registration", data, {})
      .then(this.handleRegistrationSuccess)
      .catch(this.handleRegistrationFailure)
  }

  render(){
    const { error, isRegistering } = this.state;
    const loadingDisplay = isRegistering ? 'flex' : 'none';
    const canGoBack = true
    const props = { canGoBack, ...this.props }

    return (
      <Screen
        id="register-screen"
        style={ styles.screen }
        header={ <NavHeader { ...props } /> }
      >
        <View style={ [ styles.loading, { display: loadingDisplay }] }>
          <ActivityIndicator
            animating={ isRegistering }
            color={ theme.color.lightBackground }
            size={ theme.loading.size }
          />
        </View>
        <Registration
          error={ error }
          onSubmit={ this.register }
          title="Describe Product"
        />
      </Screen>
    );
  }
}
