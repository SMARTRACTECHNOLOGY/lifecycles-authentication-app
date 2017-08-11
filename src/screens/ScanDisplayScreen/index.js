import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Screen } from '../../components';
import theme from '../../theme';
import styles from './styles';

export default class ScanDisplayScreen extends React.Component {

  navigateToScan = () => {
    this.props.navigation.navigate('Scan');
  }

  render(){
    return (
      <Screen
        id="scan-display-screen"
        style={ styles.screen }
      >
        <Button
          title="Display: Back to Scan"
          onPress={ this.navigateToScan }
        />
      </Screen>
    );
  }
}
