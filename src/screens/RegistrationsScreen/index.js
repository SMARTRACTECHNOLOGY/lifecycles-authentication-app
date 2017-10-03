import React from 'react';
import { ActivityIndicator, AsyncStorage, Image, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { NavHeader, Screen, Registration} from '../../components';
import styles from './styles';
import theme from '../../theme';

export default class RegistrationsScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error: null,
      isAuthenticating: false
    }
  }

  navigateToScan = () => {
    this.props.navigation.navigate('Scan');
  }

  navigateToScanDisplay = () => {
    this.props.navigation.navigate('ScanDisplay');
  }

  handleRegistrationSuccess = () => {
    this.setState({
      error: undefined,
      isAuthenticating: false
    });
    this.props.navigation.navigate('Dashboard');
  }

  handleRegistrationFailure = (error) => {
    this.setState({
      error: error,
      isAuthenticating: false
    });
  }

  register = ({ ...productInfo }) => {
    this.setState({
      isAuthenticating: true
    });
    const { code } = this.props.navigation.state.params.data
    const { appId, customerId } = this.props;
    const data = { appId, customerId, code, ...productInfo }
    // Todo: Call endpoint to register
  }

  render(){
    const { error, isAuthenticating } = this.state;
    const loadingDisplay = isAuthenticating ? 'flex' : 'none';
    const canGoBack = true
    const props = { canGoBack, ...this.props }

    return (
      <Screen
        id="registrations-screen"
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
        <Registration
          error={ error }
          onSubmit={ this.register }
        />
      </Screen>
    );
  }
}
