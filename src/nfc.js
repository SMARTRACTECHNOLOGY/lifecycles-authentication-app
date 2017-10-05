import NFC, { NfcDataType, NdefRecordType } from '@smartractechnology/react-native-rfid-nfc';
import { AlertIOS, Keyboard, Platform, ToastAndroid, Vibration } from 'react-native';
import { NFCReader } from 'react-native-nfc-reader';

const handleAndroidNdef = ({ onTransition }, payload) => {
  switch (payload.type) {
    case NfcDataType.NDEF:
      ToastAndroid.show('NFC Tag Detected', ToastAndroid.SHORT);
      Vibration.vibrate();
      try {
        const { data, id } = payload;
        if(data && data.length){
          const { type, data: code, encoding, locale } = data[0][0];
          if (type === NdefRecordType.TEXT) {
            // Add in navigation transition buffer
            setTimeout(() => onTransition('Display', { data: code }), 300);
          } else {
            throw new Error(`Error: Tag (${type}, ${encoding}, ${locale}), is unsupported.`);
          }
        } else {
          throw new Error('Error: Tag record does not exist.');
        }
      } catch (error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
      break;
    case NfcDataType.TAG:
      ToastAndroid.show('Invalid Tag Type Detected. Try Again.', ToastAndroid.SHORT);
      break;
    }
};

const handleIOSNdef = ({ onTransition }, data) => {
  try {
    const nfcData = data.filter(({ format, type, identifier, payload }) => (payload && payload !== null))
    if (nfcData.length > 0) {
      const { format, type, identifier, payload: code } = nfcData[0]
      if (type === 'TEXT' || 'T') {
        setTimeout(() => onTransition('Display', { data: code }), 300);
      } else {
        throw new Error(`Error: Tag (${type}), is unsupported.`);
      }
    } else {
      throw new Error('Error: Tag record does not exist.');
    }
  } catch(error) {
    AlertIOS.alert(
      "NFC Tag Error",
      error.message,
      [{text: 'OK', onPress: () => NFCReader.initialize()}]
    );
  }
};

export const bindNFC = (props) => {
  // Always remove keyboard when attempting to bind nfc
  Keyboard.dismiss();
  // Perform different operations for NFC depending on platform
  if(Platform.OS === 'ios'){
    NFCReader.initialize()
    NFCReader.on(handleIOSNdef.bind(this, props));
  } else {
    NFC.addListener('NFC_CHIP', handleAndroidNdef.bind(this, props));
  }
};

export const unbindNFC = () => {
  if(Platform.OS === 'ios'){
    NFCReader.removeNFCListeners()
  } else {
    NFC.removeListener('NFC_CHIP');
  }
};
