import React from 'react';
import { AsyncStorage, Image, Platform, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Screen } from '../../components';
import styles from './styles';

export default class SplashScreen extends React.Component {

  constructor(){
    super()
    this.state= {
      isReady: false,
      isLoggedIn: false,
      username: undefined
    };
  }

  setLoggedIn = (username) => {
    this.setState({
      isReady: true,
      isLoggedIn: true,
      username
    });
  }

  setReady = (username) => {
    this.setState({
      isReady: true,
      username
    });
  }

  checkJwt = (data) => {
    if(!data){
      return Promise.reject('');
    } else {
      const { jwt, username } = JSON.parse(data);
      if(!jwt){
        return Promise.reject(username);
      } else {
        return (
          this.props.databroker.status(jwt)
            .then(this.setLoggedIn.bind(this, username))
        );
      }
    }
  }

  navigateTo = (routeName, params) => {
    this.props.navigation.dispatch(NavigationActions.reset({
      index: 0,
      actions: [ NavigationActions.navigate({ routeName, params }) ]
    }));
  }

  loadApp = () => {
    AsyncStorage.getItem(this.props.storageKey)
      .then(this.checkJwt)
      .catch(this.setReady);
  }

  componentDidMount(){
    this.loadApp();
  }

  componentDidUpdate(prevProps, prevState) {
    const { isReady, isLoggedIn, username } = this.state;
    if (isReady) {
      const routeName = isLoggedIn ? 'Dashboard' : 'Auth';
      this.navigateTo(routeName, { username });
    }
  }

  render(){
    return (
      <Screen
        id="splash-screen"
        style={ styles.screen }
      >
        <View style={ styles.loading }>
          <Image
            source={ require('../../assets/images/logo_only.png') }
            style={ styles.splash }
          />
        </View>
      </Screen>
    );
  }
}
