import React from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage, Image, StyleSheet, Text, View } from 'react-native';
import Button from './Button';
import theme from '../theme';

/*
* NavHeader Component
*/

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    width: '100%',
    backgroundColor: theme.color.primary,
    paddingRight: 10,
    paddingLeft: 10
  },
  logo: {
    height: 45,
    width: 45
  },
  button: {
    backgroundColor: theme.color.primary
  },
  email: {
    color: theme.color.white,
    fontSize: 16
  }
});

export default class NavHeader extends React.Component {

  constructor(props){
    super(props);
    this.maxLength = 30;
  }

  navigateToDashboard = () => {
    this.props.navigation.navigate('Dashboard');
  }

  handleBackButton = () => {
    this.props.navigation.goBack();
  }

  handleLogout = () => {
    this.props.databroker.logout()
      .then(() => {
        AsyncStorage.getItem(this.props.storageKey, (err, result) => {
          // Remove jwt from storage but keep everything else
          const { jwt, ...rest } = JSON.parse(result);
          const navigateToAuth = () => this.props.navigation.navigate('Auth', { username: rest.username });
          AsyncStorage.setItem(this.props.storageKey, JSON.stringify(rest))
            .then(navigateToAuth)
            .catch(() => AsyncStorage.clear().then(navigateToAuth))
        });
      });
  }

  // Truncates email after 15 characters
  formatEmail(email){
    return (
      email && email.length > this.maxLength ?
        `${ email.substring(0, this.maxLength)}...`
        :
        email
    );
  }

  render(){
    const { canGoBack = false, databroker } = this.props;
    const { email } = databroker.context();
    return (
      <View style={ styles.container }>
        {
          canGoBack ?
            <Button
              title="Back"
              onPress={ this.handleBackButton }
            />
            :
            this.props.navigation.state.routeName === 'Dashboard' ?
              <Image
                style={ styles.logo }
                source={ require('../assets/images/logo_only.png') }
              />
              :
              <Button
                style={ styles.button }
                title="Dashboard"
                onPress={ this.navigateToDashboard }
              />
        }
        <Text style={ styles.email }>{ this.formatEmail(email) }</Text>
        <Button
          style={ styles.button }
          title="Logout"
          onPress={ this.handleLogout }
        />
      </View>
    );
  }
}
