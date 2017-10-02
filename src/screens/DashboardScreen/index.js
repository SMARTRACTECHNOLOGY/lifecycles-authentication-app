import React from 'react';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { NavHeader, Screen } from '../../components';
import styles from './styles';

export default class DashboardScreen extends React.Component {

  navigateToSettings = () => {
    this.props.navigation.navigate('Settings');
  }

  navigateToHelp = () => {
    this.props.navigation.navigate('Help');
  }

  navigateToScan = () => {
    this.props.navigation.navigate('Scan');
  }

  navigateToRegistrations = () => {
    this.props.navigation.navigate('Registrations');
  }

  render(){
    return (
      <Screen
        id="dashboard-screen"
        style={ styles.screen }
        header={ <NavHeader { ...this.props } /> }
      >
        <View style={ styles.navigation }>
          <TouchableHighlight
            style={ styles.navigation__container }
            onPress={ this.navigateToScan }
          >
            <View style={ styles.scan__navigation }>
              <View style={ styles.item__image }>
                <Image
                  style={ styles.image }
                  source={ require('../../assets/images/scan_white.png') }
                />
              </View>
              <View style={ styles.item__text }>
                <Text style={ styles.text }>Tap Tag</Text>
                <Text style={ styles.text__help }>
                  Use your NFC reader to tap a tag and read associated information
                </Text>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={ styles.navigation__container }
            onPress={ this.navigateToRegistrations }
          >
            <View style={ styles.registrations__navigation }>
              <View style={ styles.item__image }>
                <Image
                  style={ styles.image }
                  source={ require('../../assets/images/user_tags_white.png') }
                />
              </View>
              <View style={ styles.item__text }>
                <Text style={ styles.text }>My Registrations</Text>
                <Text style={ styles.text__help }>
                  View your personalized tag registrations
                </Text>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={ styles.navigation__container }
            onPress={ this.navigateToSettings }
          >
            <View style={ styles.settings__navigation }>
              <View style={ styles.item__image }>
                <Image
                  style={ styles.image }
                  source={ require('../../assets/images/settings_white.png') }
                />
              </View>
              <View style={ styles.item__text }>
                <Text style={ styles.text }>Settings</Text>
                <Text style={ styles.text__help }>
                  Manage your application preferences
                </Text>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={ styles.navigation__container }
            onPress={ this.navigateToHelp }
          >
            <View style={ styles.help__navigation }>
              <View style={ styles.item__image }>
                <Image
                  style={ styles.image }
                  source={ require('../../assets/images/help_white.png') }
                />
              </View>
              <View style={ styles.item__text }>
                <Text style={ styles.text }>Help</Text>
                <Text style={ styles.text__help }>
                  View a quick run through of the application features
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        </View>
      </Screen>
    );
  }
}
