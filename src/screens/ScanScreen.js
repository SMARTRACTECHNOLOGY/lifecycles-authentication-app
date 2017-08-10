import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Screen } from '../components';
import theme from '../theme';

const styles = StyleSheet.create({
  screen: {
    backgroundColor: theme.color.lightBackground
  }
});

export default class ScanScreen extends React.Component {

  navigateToScanDisplay = () => {
    this.props.navigation.navigate('Display');
  }

  render(){
    return (
      <Screen id="scan-screen">
        <Button
          title="Scanning: Go to Display"
          onPress={ this.navigateToScanDisplay }
        />
      </Screen>
    );
  }
}
