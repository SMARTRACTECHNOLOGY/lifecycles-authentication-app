import React from 'react';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { NavHeader, Screen } from '../../components';
import styles from './styles';

const NavigationItem = ({ imageSrc, title, help, onPress, style }) => (
  <TouchableHighlight
    style={ styles.navigation__container }
    onPress={ onPress }
  >
    <View style={ style }>
      <View style={ styles.item__image }>
        <Image
          style={ styles.image }
          source={ imageSrc }
        />
      </View>
      <View style={ styles.item__text }>
        <Text style={ styles.text }>{ title }</Text>
        <Text style={ styles.text__help }>{ help }</Text>
      </View>
    </View>
  </TouchableHighlight>
);

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
          <NavigationItem
            imageSrc={ require('../../assets/images/scan_white.png') }
            title="Tap Tag"
            help="Use your NFC reader to tap a tag and read associated information"
            onPress={ this.navigateToScan }
            style={ styles.scan__navigation }
          />
          <NavigationItem
            imageSrc={ require('../../assets/images/user_tags_white.png') }
            title="My Registrations"
            help="View your personalized tag registrations"
            onPress={ this.navigateToRegistrations }
            style={ styles.registrations__navigation }
          />
          {
            /*
            Remove unused navigation items for now
            <NavigationItem
              imageSrc={ require('../../assets/images/settings_white.png') }
              title="Settings"
              help="Manage your application preferences"
              onPress={ this.navigateToSettings }
              style={ styles.settings__navigation }
            />
            <NavigationItem
              imageSrc={ require('../../assets/images/help_white.png') }
              title="Help"
              help="View a quick run through of the application features"
              onPress={ this.navigateToSettings }
              style={ styles.help__navigation }
            />
            */
          }
        </View>
      </Screen>
    );
  }
}
