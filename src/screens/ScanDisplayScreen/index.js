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

  handleLoadingSuccess = ([skus, products]) => {
    const { data: skuData } = skus;
    const { data: productData } = products;
    const scannedData = this.props.navigation.state.params.data;
    //const currentSku = data.filter(({ code }) => scannedData.sku)[0];
    const relatedProduct = productData[0];//productData.filter(({ id }) => currentSku.productId === id);
    this.setState({
      isLoading: false,
      data: {
        code: '123456789',
        product: relatedProduct,
        metadata: [{
          key_name: 'color',
          value: 'Black'
        },
        {
          key_name: 'size',
          value: '8'
        },
        {
          key_name: 'style',
          value: 'Thick'
        }]
      }
    });
  }

  loadScanData = () => {
    const { databroker } = this.props;
    const promises = [databroker.get('skumapping_list'), databroker.get('product_list')];
    this.setState({ isLoading: true });
    // Run promises concurrently
    Promise.all(promises)
      .then(this.handleLoadingSuccess)
      .catch(this.handleLoadingError)
  }

  componentDidMount(){
    this.loadScanData();
  }

  render(){
    const { data, isLoading } = this.state;
    const { sku } = this.props.navigation.state.params.data;
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
        {
          !isLoading && data ?
            <ScrollView style={ styles.data }>
              <Text style={ styles.sku }>SKU: { sku }</Text>
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
              <View style={ styles.metadata }>
                <Text style={ styles.details }>Details</Text>
                {
                  data.metadata.map(({ key_name, value }) => (
                    <View
                      key={ key_name }
                      style={ styles.metadata__info }
                    >
                      <Text style={ styles.metadata__label }>{ key_name }</Text>
                      <Text style={ styles.metadata__value }>{ value }</Text>
                    </View>
                  ))
                }
              </View>
            </ScrollView>
            :
            <Text style={ styles.nothing }>
              No data found for SKU: { sku }
            </Text>
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
