import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import theme from '../theme';

/*
* LoadingIndicator Component
*/

const styles = StyleSheet.create({
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 9999
  }
});

export default ({ showing }) => (
  <View style={ [ styles.loading, { display: showing ? 'flex' : 'none' }] }>
    <ActivityIndicator
      animating={ showing }
      color={ theme.color.lightBackground }
      size={ theme.loading.size }
    />
  </View>
);
