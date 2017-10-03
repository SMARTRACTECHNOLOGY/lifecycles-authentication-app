import React from 'react';
import { AsyncStorage, Image, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { NavHeader, Screen } from '../../components';
import styles from './styles';

export default class RegistrationsScreen extends React.Component {

  navigateToScan = () => {
    this.props.navigation.navigate('Scan');
  }

  navigateToScanDisplay = () => {
    this.props.navigation.navigate('ScanDisplay');
  }

  render(){
    return (
      <Screen
        id="registrations-screen"
        style={ styles.screen }
        header={ <NavHeader { ...this.props } /> }
      >
        <View style={ styles.loading }>
          <Text>Put registration list here.</Text>
        </View>
      </Screen>
    );
  }
}
