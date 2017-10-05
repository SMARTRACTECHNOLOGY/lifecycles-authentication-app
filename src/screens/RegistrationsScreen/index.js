import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { LoadingIndicator, NavHeader, Screen, SelectList, URLImage } from '../../components';
import styles from './styles';

export default class RegistrationsScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      error: undefined
    };
    this.errors = {
      fetch: 'There was an error fetching your registered products. Please Try Again.'
    };
  }

  navigateToScanDisplay = (tid) => {
    this.props.navigation.navigate('Display', { data: tid });
  }

  handleRegistrationsSuccess = ({ data, message, code }) => {
    const hasError = message || typeof data === 'undefined';
    this.setState({
      isLoading: false,
      data: hasError ? [] : data,
      error: hasError ? message : undefined
    });
  }

  handleRegistrationsError = (error) => {
    this.setState({
      isLoading: false,
      data: [],
      error: this.errors.fetch
    });
  }

  loadRegistrations = () => {
    const { applicationId, databroker } = this.props;
    databroker.get('listRegistrations', { applicationId })
      .then(this.handleRegistrationsSuccess)
      .catch(this.handleRegistrationsError)
  }

  renderItem = ({ item }) => {
    const { id, tid, name, description, imageUrl } = item;
    return (
      <TouchableOpacity onPress={ this.navigateToScanDisplay.bind(this, tid) }>
        <View style={ styles.list__item }>
          <URLImage url={ imageUrl } />
          <View style={ styles.item__meta }>
            <Text style={ styles.item__tid }>{ tid }</Text>
            <Text style={ styles.item__name }>{ name }</Text>
            <Text style={ styles.item__description }>{ description }</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  componentDidMount(){
    this.loadRegistrations();
  }

  render(){
    const { data, error, isLoading } = this.state;
    if(isLoading){
      return <LoadingIndicator showing={ isLoading } />;
    }
    return (
      <Screen
        id="registrations-screen"
        style={ styles.screen }
        header={ <NavHeader { ...this.props } /> }
      >
        <View style={ styles.list }>
          <View style={ styles.title__container }>
            <Text style={ styles.title }>My Registrations</Text>
          </View>
          {
            data && data.length > 0 ?
              <SelectList
                data={ data }
                itemKey="tid"
                renderItem={ this.renderItem }
              />
              :
              !error ?
                <View style={ styles.nothing }>
                  <Image
                    source={ require('../../assets/images/user_tags.png') }
                    style={ styles.nothing__image }
                  />
                  <Text style={ styles.nothing__help }>No Registrations Found</Text>
                </View>
                :
                <View style={ styles.missing }>
                  <Text style={ styles.error }>{ error }</Text>
                </View>
          }
        </View>
      </Screen>
    );
  }
}
