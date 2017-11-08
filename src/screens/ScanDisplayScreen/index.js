import React from 'react';
import {
  AsyncStorage,
  ActivityIndicator,
  BackHandler,
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  Button,
  LoadingIndicator,
  NavHeader,
  Screen,
  URLImage
} from '../../components';
import styles from './styles';

export default class ScanDisplayScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      data: undefined,
      error: undefined,
      registration: undefined
    };
    this.errors = {
      fetch: 'There was an error fetching the tag metadata. Please Try Again.',
      doesNotExist: 'The tag you are looking for does not exist.'
    };
  }

  navigateToScan = () => {
    this.props.navigation.navigate('Scan');
  }

  handleLoadingError = (error) => {
    if(error.code === 401){
      this.props.databroker.logout()
        .then(() => {
          AsyncStorage.getItem(this.props.storageKey, (err, result) => {
            // Remove jwt from storage but keep everything else
            const navigateToAuth = () => this.props.navigation.navigate('Auth');
            AsyncStorage.setItem(this.props.storageKey, JSON.stringify({}))
              .then(navigateToAuth)
              .catch(() => AsyncStorage.clear().then(navigateToAuth))
          });
        });
    } else {
      this.setState({
        isLoading: false,
        data: undefined,
        registration: undefined,
        error: this.errors.fetch
      });
    }
  }

  handleLoadingSuccess = (tid, [{ data, message, code }, { data: registration }]) => {
    if(message || typeof data === 'undefined'){
      this.setState({
        isLoading: false,
        data: undefined,
        registration: undefined,
        error: message
      });
    } else {
      const hasData = data && data.product.length > 0;
      if(hasData){
        const { product, metadata } = data;
        this.setState({
          isLoading: false,
          data: {
            tid,
            // Just get the most recent product to show
            // In this case its in descending order from the backend
            product: product[0],
            metadata
          },
          registration,
          error: undefined
        });
      } else {
        this.setState({
          isLoading: false,
          data: undefined,
          registration: undefined,
          error: this.errors.doesNotExist
        });
      }
    }
  }

  registerProduct = () => {
    const { data } = this.state;
    this.props.navigation.navigate('Register', data);
  }

  updateRegistration = () => {
    const { data, registration } = this.state;
    this.props.navigation.navigate('Register', { ...data, registration });
  }

  loadScanData = () => {
    // Retrieve tag metadata for tag, override the base service url since its not `/rest` for some reason
    const { applicationId, navigation } = this.props;
    const tid = navigation.state.params.tid;
    Promise.all([
      this.props.databroker.get('tagInfo', { tid }),
      this.props.databroker.get('getRegistration', { applicationId, tid })
    ])
    .then(this.handleLoadingSuccess.bind(this, tid))
    .catch(this.handleLoadingError)
  }

  componentDidMount(){
    this.loadScanData();
  }

  render(){
    const { data, error, isLoading, registration } = this.state;
    const tid = this.props.navigation.state.params.tid;
    const hasData = typeof data !== 'undefined';
    if(isLoading){
      return <LoadingIndicator showing={ isLoading } />;
    }
    return (
      <Screen
        id="scan-display-screen"
        style={ styles.screen }
        header={ <NavHeader { ...this.props } /> }
      >
        {
          hasData ?
            <ScrollView
              style={ styles.data }
              refreshControl={
                <RefreshControl
                  refreshing={ false }
                  onRefresh={ this.loadScanData }
                />
              }
            >
              <Text style={ styles.tag }>TAG <Text style={ styles.code }>{ tid }</Text></Text>
              {
                data.product &&
                  <View style={ styles.product }>
                    <URLImage
                      url={ data.product.imageUrl }
                      style={{ height: 100, width: 100 }}
                    />
                    <View style={ styles.product__info }>
                      <Text style={ styles.info__name }>
                        { data.product.name }
                      </Text>
                      <Text style={ styles.info__description }>
                        { data.product.description || 'N/A' }
                      </Text>
                    </View>
                  </View>
              }
              {
                registration &&
                  <View style={ styles.metadata }>
                    <Text style={ styles.details }>Personal Registration</Text>
                    <View style={ styles.metadata__info }>
                      <Text style={ styles.metadata__label }>Name</Text>
                      <Text style={ styles.metadata__value }>{ registration.name }</Text>
                    </View>
                    <View style={ styles.metadata__info }>
                      <Text style={ styles.metadata__label }>Description</Text>
                      <Text style={ styles.metadata__value }>{ registration.description || 'N/A' }</Text>
                    </View>
                  </View>
              }
              <View style={ styles.metadata }>
                <Text style={ styles.details }>Details</Text>
                {
                  data.metadata ?
                    Object.keys(data.metadata).map(metakey => (
                      <View
                        key={ metakey }
                        style={ styles.metadata__info }
                      >
                        <Text style={ styles.metadata__label }>{ metakey }</Text>
                        <Text style={ styles.metadata__value }>{ data.metadata[metakey] }</Text>
                      </View>
                    ))
                    :
                    <Text style={ styles.nothing }>No metadata found</Text>
                }
              </View>
            </ScrollView>
            :
            <View style={ styles.missing }>
              <Text style={ styles.nothing }>
                {
                  !error ?
                    `No data found for TAG: ${ tid }`
                    :
                    error
                }
              </Text>
            </View>
        }
        <View style={ styles.buttonView }>
          {
            hasData && !registration &&
              <Button
                style={ styles.button }
                title='Register Product'
                onPress={ this.registerProduct }
              />
          }
          {
            hasData && registration &&
              <Button
                style={ [styles.button, styles.update__button] }
                title='Update Registration'
                onPress={ this.updateRegistration }
              />
          }
          <Button
            style={ styles.button }
            title={ isLoading ? 'Cancel' : 'Scan Another' }
            onPress={ this.navigateToScan }
          />
        </View>
      </Screen>
    );
  }
}
