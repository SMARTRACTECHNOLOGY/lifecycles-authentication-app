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
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%'
  },
  header__inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 60,
    width: '100%'
  }
});

const Screen = ({ id, style = {}, header, children }) => (
  <View
    id={ id }
    style={ [ styles.container, style ] }
  >
    {
      header &&
        <View style={ styles.header }>
          <View style={ styles.header__inner }>{ header }</View>
        </View>
    }
    { children }
  </View>
);

Screen.propTypes = {
  id: PropTypes.string.isRequired,
  header: PropTypes.any
};

export default Screen;
