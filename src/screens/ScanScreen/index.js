import React from 'react';
import { AsyncStorage, Image, Text, ToastAndroid, View } from 'react-native';
import NFC, { NfcDataType, NdefRecordType } from 'react-native-nfc';
import { Button, NavHeader, Screen } from '../../components';
import styles from './styles';

export default class ScanScreen extends React.Component {

  navigateToScanDisplay = () => {
    this.props.navigation.navigate('Display');
  }

  handleNdef (payload) {
    const { data, id } = payload;
    for (const dataIndex in data) {
      const records = data[dataIndex];
      for (let recordIndex in records) {
        const { type, data } = records[recordIndex];
        console.log('read ndef tag', id, type, data);
        if (type === NdefRecordType.TEXT) {
          try {
            NFC.removeListener('NFC_CHIP');
            this.navigateToScan({ id, data });
          } catch (e) {
            this.navigateToScan({ id, data });
          }
        } else {
          ToastAndroid.show(`Non-TEXT tag of type ${type} with data ${data}`, ToastAndroid.SHORT);
        }
      }
    }
  }

  bindNfcListener () {
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
  }

  componentDidMount () {
    this.bindNfcListener();
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
