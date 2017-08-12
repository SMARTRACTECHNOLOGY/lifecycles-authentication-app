import React from 'react';
import { AsyncStorage, Image, Keyboard, Text, ToastAndroid, View } from 'react-native';
import NFC, { NfcDataType, NdefRecordType } from 'react-native-nfc';
import { Button, NavHeader, Screen } from '../../components';
import styles from './styles';

export default class ScanScreen extends React.Component {

  constructor(props){
    super(props);
    this.simulate = true;
    this.bound = false;
  }

  navigateToScanDisplay = (data) => {
    this.props.navigation.navigate('Display', { data });
    NFC.removeListener('NFC_CHIP');
  }

  handleNdef(payload) {
    const { data, id } = payload;
    for (const dataIndex in data) {
      const records = data[dataIndex];
      for (let recordIndex in records) {
        const { type, data } = records[recordIndex];
        console.log('read ndef tag', id, type, data);
        if (type === NdefRecordType.TEXT) {
          this.navigateToScanDisplay(JSON.parse(data));
        } else {
          ToastAndroid.show(`Non-TEXT tag of type ${type} with data ${data}`, ToastAndroid.SHORT);
        }
      }
    }
  }

  bindNfcListener() {
    NFC.addListener('NFC_CHIP', (payload) => {
      switch (payload.type) {
        case NfcDataType.NDEF:
          ToastAndroid.show(`NFC Tag Detected`, ToastAndroid.SHORT);
          this.handleNdef(payload);
          break;
        case NfcDataType.TAG:
          ToastAndroid.show('Invalid Tag Type Detected. Try Again.', ToastAndroid.SHORT);
          break;
      }
    });
    this.bound = true;
  }

  simulateTap = () => {
    this.navigateToScanDisplay({
      sku: 123456789
    });
  }

  componentDidMount() {
    // Remove keyboard from view just in case its up
    Keyboard.dismiss();
    if(!this.bound){
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
          <Text style={ styles.help__text }>TAP NFC</Text>
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
