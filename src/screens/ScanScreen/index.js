import React from 'react';
import { AsyncStorage, Image, Text, View } from 'react-native';
import { Button, NavHeader, Screen } from '../../components';
import styles from './styles';

export default class ScanScreen extends React.Component {

  navigateToScanDisplay = () => {
    this.props.navigation.navigate('Display');
  }

  render(){
    return (
      <Screen
        id="scan-screen"
        style={ styles.screen }
        header={ <NavHeader { ...this.props } /> }
      >
        <View style={ styles.scan }>
          <Image
            style={ styles.scan__image }
            source={ require('../../assets/images/scan.png') }
          />
        </View>
        <View style={ styles.help }>
          <Text style={ styles.help__text }>TAP NFC</Text>
        </View>
      </Screen>
    );
  }
}
