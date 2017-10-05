import React from 'react';
import { Image, StyleSheet } from 'react-native';
import theme from '../theme';

/*
* URLImage Component
*/

const styles = StyleSheet.create({
  image: {
    display: 'flex',
    width: 125,
    height: 125,
    flexShrink: 0
  },
  blank__image: {
    display: 'flex',
    width: 125,
    height: 125,
    flexShrink: 0,
    opacity: 0.5
  }
});

export default ({ url, style }) => (
  url ?
    <Image
      source={{ uri: url }}
      style={[ styles.image, style]}
    />
    :
    <Image
      source={ require('../assets/images/blank_image.png') }
      style={[ styles.blank__image, style] }
    />
);
