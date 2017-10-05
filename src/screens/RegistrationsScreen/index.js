import React from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { LoadingIndicator, NavHeader, Screen } from '../../components';
import theme from '../../theme';
import styles from './styles';

export default class RegistrationsScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      error: undefined
    };
  }

  navigateToScan = () => {
    this.props.navigation.navigate('Scan');
  }

  navigateToScanDisplay = () => {
    this.props.navigation.navigate('ScanDisplay');
  }

  loadRegistrations = () => {
    console.log('load a users registrations by customer id');
    setTimeout(() => {
      this.setState({
        isLoading: false,
        data: [{
          name: 'a',
          description: 'b',
          imageUrl: 'c'
        }]
      });
    }, 500);
    /*
    this.props.databroker.get('byTid', { tid: code })
      .then(this.handleLoadingSuccess.bind(this, code))
      .catch(this.handleLoadingError)
    */
  }

  componentDidMount(){
    this.loadRegistrations();
  }

  render(){
    const { isLoading } = this.state;
    if(isLoading){
      return <LoadingIndicator showing={ isLoading } />;
    }
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
