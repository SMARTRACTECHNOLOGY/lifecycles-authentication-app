import React from 'react';
import { ActivityIndicator, ListView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, NavHeader, Screen } from '../../components';
import theme from '../../theme';
import styles from './styles';

export default class ScanDisplayScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      data: undefined,
      error: undefined
    };
  }

  navigateToScan = () => {
    this.props.navigation.navigate('Scan');
  }

  handleLoadingError = (err) => {
    this.setState({
      isLoading: false,
      error: err.message
    });
  }

  handleLoadingSuccess = ({ success, data }) => {
    if(success){
      this.setState({
        isLoading: false,
        data
      });
    } else {
      this.setState({
        isLoading: false,
        error: 'There was an error processing the request.'
      });
    }
  }

  loadScanData = () => {
    const { databroker, navigation } = this.props;
    const scanData = navigation.state.params.data;
    const params = {
      id: scanData.sku
    };
    this.setState({ isLoading: true });
    databroker.get('product_list', {})
      .then(this.handleLoadingSuccess)
      .catch(this.handleLoadingError);
  }

  componentDidMount(){
    this.loadScanData();
  }

  render(){
    const { data, isLoading } = this.state;
    const loadingDisplay = isLoading ? 'flex' : 'none';
    return (
      <Screen
        id="scan-display-screen"
        style={ styles.screen }
        header={ <NavHeader { ...this.props } /> }
      >
        <View style={ [ styles.loading, { display: loadingDisplay }] }>
          <ActivityIndicator
            animating={ isLoading }
            color={ theme.color.lightBackground }
            size={ theme.loading.size }
          />
        </View>
        <ScrollView style={ styles.data }>
          <Text>{ JSON.stringify(data) }</Text>
        </ScrollView>
        <Button
          style={ styles.button }
          title={ isLoading ? 'Cancel' : 'Scan Another' }
          onPress={ this.navigateToScan }
        />
      </Screen>
    );
  }
}
