import React from 'react';
import PropTypes from 'prop-types';
import { Button, StyleSheet, View } from 'react-native';
import theme from '../theme';

/*
* NavHeader Component
*/

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    width: '100%',
    backgroundColor: theme.color.primary
  },
  logout: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
});

const NavHeader = ({ style = {}, onLogout }) => (
  <View style={ styles.container }>
    <View />
    <View style={ styles.logout }>
      <Button
        title="Logout"
        onPress={ onLogout }
      />
    </View>
  </View>
);

NavHeader.propTypes = {
  onLogout: PropTypes.func.isRequired
};

export default NavHeader;
