import React from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, NavHeader, Screen } from '../../components';
import theme from '../../theme';
import styles from './styles';

export default class ScanDisplayScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      data: undefined,
      error: undefined
    };
    this.errors = {
      fetch: 'There was an error fetching the tag metadata. Please Try Again.'
    };
  }

  navigateToScan = () => {
    this.props.navigation.navigate('Scan');
  }

  handleLoadingError = (error) => {
    this.setState({
      isLoading: false,
      data: undefined,
      error: this.errors.fetch
    });
  }

    handleLoadingSuccess = (code, { data, success }) => {
      if(!success){
        this.setState({
          isLoading: false,
          data: undefined,
          error: this.errors.fetch
        });
      } else {
        const hasData = typeof data[code] !== 'undefined' && data[code].length > 0
        this.setState({
          isLoading: false,
          data: hasData ? {
            code,
            metadata: data[code]
          } : undefined,
          error: undefined
        });
      }
  }

  loadScanData = () => {
    // Retrieve tag metadata for tag, override the base service url since its not `/rest` for some reason
    const code = this.props.navigation.state.params.data;
    this.props.databroker.get('tag_metadata', { data: [code] }, { base: '/tag' })
      .then(this.handleLoadingSuccess.bind(this, code))
      .catch(this.handleLoadingError)
  }

  componentDidMount(){
    this.loadScanData();
  }

  render(){
    const { data, error, isLoading } = this.state;
    const code = this.props.navigation.state.params.data;
    const loadingDisplay = isLoading ? 'flex' : 'none';
    const hasData = typeof data !== 'undefined';
    if(isLoading){
      return (
        <View style={ [ styles.loading, { display: loadingDisplay }] }>
          <ActivityIndicator
            animating={ isLoading }
            color={ theme.color.lightBackground }
            size={ theme.loading.size }
          />
        </View>
      )
    }
    return (
      <Screen
        id="scan-display-screen"
        style={ styles.screen }
        header={ <NavHeader { ...this.props } /> }
      >
        {
          hasData ?
            <ScrollView style={ styles.data }>
              <Text style={ styles.sku }>SKU <Text style={ styles.code }>{ code }</Text></Text>
              {
                data.product &&
                  <View style={ styles.product }>
                    <Image
                      source={{ uri: data.product.imageUrl }}
                      style={ styles.product__image }
                    />
                    <View style={ styles.product__info }>
                      <Text style={ styles.info__name }>
                        { data.product.name }
                      </Text>
                      <Text style={ styles.info__description }>
                        { data.product.description }
                      </Text>
                    </View>
                  </View>
              }
              <View style={ styles.metadata }>
                <Text style={ styles.details }>Details</Text>
                {
                  data.metadata.map(({ metadata }) => (
                    Object.keys(metadata).map(key => (
                      <View
                        key={ key }
                        style={ styles.metadata__info }
                      >
                        <Text style={ styles.metadata__label }>{ key }</Text>
                        <Text style={ styles.metadata__value }>{ metadata[key] }</Text>
                      </View>
                    ))
                  ))
                }
              </View>
            </ScrollView>
            :
            <View style={ styles.missing }>
              <Text style={ styles.nothing }>
                {
                  !error ?
                    `No data found for SKU: ${ code }`
                    :
                    error
                }
              </Text>
            </View>
        }
        <Button
          style={ styles.button }
          title={ isLoading ? 'Cancel' : 'Scan Another' }
          onPress={ this.navigateToScan }
        />
      </Screen>
    );
  }
}
