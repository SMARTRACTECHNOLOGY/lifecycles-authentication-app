import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import theme from '../theme';

/*
* Screen Component
* Simple top-level layout component that provides a full height / width / columnized
*/

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '100%',
    width: '100%',
    backgroundColor: theme.color.lightBackground
  }
});

const Screen = ({ id, style = {}, children }) => (
  <View
    id={ id }
    style={ [ styles.container, style ] }
  >
    { children }
  </View>
);

Screen.propTypes = {
  id: PropTypes.string.isRequired
};

export default Screen;
