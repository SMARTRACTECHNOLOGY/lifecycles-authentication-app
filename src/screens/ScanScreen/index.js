import React from 'react';
import { AsyncStorage, Image, Keyboard, Text, ToastAndroid, Vibration, View } from 'react-native';
import NFC, { NfcDataType, NdefRecordType } from 'react-native-nfc';
import { Button, NavHeader, Screen } from '../../components';
import styles from './styles';

export default class ScanScreen extends React.Component {

  constructor(props){
    super(props);
    this.simulate = false;
    this.bound = false;
  }

  navigateToScanDisplay = (data) => {
    this.props.navigation.navigate('Display', { data });
    NFC.removeListener('NFC_CHIP');
    this.bound = false;
  }

  /*
  * Handles a single NDEF read and an individual record on a tag of type text ref tag metadata
  */
  handleNdef(payload) {
    try {
      const { data, id } = payload;
      if(data && data.length){
        const { type, data: code, encoding, locale } = data[0][0];
        if (type === NdefRecordType.TEXT) {
          // Add in navigation transition buffer
          setTimeout(() => this.navigateToScanDisplay(code), 300);
        } else {
          throw new Error(`Error: Tag (${type}, ${encoding}, ${locale}), is unsupported.`);
        }
      } else {
        throw new Error('Error: Tag record does not exist.');
      }
    } catch (error){
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  }

  bindNfcListener() {
    NFC.addListener('NFC_CHIP', (payload) => {
      switch (payload.type) {
        case NfcDataType.NDEF:
          ToastAndroid.show('NFC Tag Detected', ToastAndroid.SHORT);
          Vibration.vibrate();
          this.handleNdef(payload);
          break;
        case NfcDataType.TAG:
          ToastAndroid.show('Invalid Tag Type Detected. Try Again.', ToastAndroid.SHORT);
          break;
      }
    });
    this.bound = true;
  }

  /*
  * STRICTLY FOR DEBUGGING PURPOSES
  */
  simulateTap = () => {
    this.navigateToScanDisplay('12FA34D');
  }

  componentDidMount() {
    // Remove keyboard from view just in case its up
    Keyboard.dismiss();
    if(!this.bound && !this.simulate){
      this.bindNfcListener();
    }
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
