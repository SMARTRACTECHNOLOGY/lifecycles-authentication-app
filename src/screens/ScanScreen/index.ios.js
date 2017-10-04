import React from 'react';
import { AlertIOS, AsyncStorage, DeviceEventEmitter, Image, Text, View } from 'react-native';
import { NFCReader } from 'react-native-nfc-reader';
import { Button, NavHeader, Screen } from '../../components';
import styles from './styles';

export default class ScanScreenIOS extends React.Component {

  constructor(props){
    super(props);
    this.simulate = false;
    this.bound = false;
  }

  navigateToScanDisplay = (data) => {
    this.props.navigation.navigate('Display', { data });
    NFCReader.removeNFCListeners()
    this.bound = false;
  }

 /*
  * Handles a single NDEF read and an individual record on a tag of type text ref tag metadata
  */
  handleNdef(data) {
    try {
      const nfcData = data.filter(({ format, type, identifier, payload }) => (payload && payload !== null))
      if (nfcData.length > 0) {
        const { format, type, identifier, payload } = nfcData[0]
        if (type === 'TEXT' || 'T') {
          setTimeout(() => this.navigateToScanDisplay(payload), 300);
        } else {
          throw new Error(`Error: Tag (${type}, ${encoding}, ${locale}), is unsupported.`);
        }
      } else {
        throw new Error('Error: Tag record does not exist.');
      }
    } catch(error) {
      AlertIOS.alert(
        "NFC Tag Error",
        error.message,
        [
          {text: 'OK', onPress: () => NFCReader.initialize()}
        ]
      );
    }

  }

  bindNfcListener() {
    NFCReader.on((payload) => {
      this.handleNdef(payload);
    });
    this.bound = true;
  }

  /*
  * STRICTLY FOR DEBUGGING PURPOSES
  */
  simulateTap = () => {
    this.navigateToScanDisplay(123456789);
  }

  componentDidMount() {
    if(!this.bound){
      NFCReader.initialize();
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
