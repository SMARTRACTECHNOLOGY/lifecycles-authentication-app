import React from 'react';
import { AsyncStorage, Image, Keyboard, Text, ToastAndroid, Vibration, View } from 'react-native';
import { Button, NavHeader, Screen } from '../../components';
import styles from './styles';

export default class ScanScreen extends React.Component {

  constructor(props){
    super(props);
    this.simulate = false;
  }

  /*
  * STRICTLY FOR DEBUGGING PURPOSES
  */
  simulateTap = () => {
    this.navigateToScanDisplay('12FA34D');
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
          <Text style={ styles.help__text }>TAP TAG</Text>
        </View>
        {
          this.simulate &&
            <Button
              style={ styles.simulateTap }
              title="Simulate"
              onPress={ this.simulateTap }
            />
        }
      </Screen>
    );
  }
}
