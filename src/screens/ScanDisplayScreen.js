import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Screen } from '../components';
import theme from '../theme';

const styles = StyleSheet.create({
  screen: {
    backgroundColor: theme.color.lightBackground
  }
});

export default class ScanDisplayScreen extends React.Component {

  navigateToScan = () => {
    this.props.navigation.navigate('Scan');
  }

  render(){
    return (
      <Screen id="scan-display-screen">
        <Button
          title="Display: Back to Scan"
          onPress={ this.navigateToScan }
        />
      </Screen>
    );
  }
}
