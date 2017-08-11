import React from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage, Image, StyleSheet, View } from 'react-native';
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
  }
});

export default class  NavHeader extends React.Component {

  constructor(props){
    super(props);
  }

  handleBackButton = () => {
    this.props.navigation.goBack();
  }

  handleLogout = () => {
    this.props.databroker.logout()
      .then(() => {
        const navigateToAuth = () => this.props.navigation.navigate('Auth');
        AsyncStorage.getItem(this.props.storageKey, (err, result) => {
          // Remove jwt from storage but keep everything else
          const { jwt, ...rest } = JSON.parse(result);
          AsyncStorage.setItem(this.props.storageKey, JSON.stringify(rest))
            .then(navigateToAuth)
            .catch(() => AsyncStorage.clear().then(navigateToAuth))
        });
      });
  }

  render(){
    const { canGoBack = false } = this.props;
    return (
      <View style={ styles.container }>
        {
          canGoBack ?
            <Button
              title="Back"
              onPress={ this.handleBackButton }
            />
            :
            <Image
              style={ styles.logo }
              source={ require('../assets/images/logo_only.png') }
            />
        }
        <Button
          style={ styles.button }
          title="Logout"
          onPress={ this.handleLogout }
        />
      </View>
    );
  }
}
