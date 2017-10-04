import React from 'react';
import { ActivityIndicator, AsyncStorage, Image, Text, View } from 'react-native';
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
  }

  handleRegistrationSuccess = () => {
    this.setState({
      error: undefined,
      isRegistering: false
    });
    this.props.navigation.navigate('Dashboard');
  }

  handleRegistrationFailure = (error) => {
    this.setState({
      error: error,
      isRegistering: false
    });
  }

  register = ({ ...productInfo }) => {
    this.setState({
      isRegistering: true
    });
    const { code } = this.props.navigation.state.params.data
    const { appId, customerId } = this.props;
    const data = { appId, customerId, code, ...productInfo }
    // Todo: Call endpoint to register
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
