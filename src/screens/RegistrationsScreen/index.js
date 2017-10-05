import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { LoadingIndicator, NavHeader, Screen, SelectList } from '../../components';
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

  navigateToScanDisplay = (tid) => {
    this.props.navigation.navigate('Display', { data: tid });
  }

  loadRegistrations = () => {
    setTimeout(() => {
      this.setState({
        isLoading: false,
        data: [{
          id: 'a',
          tid: '12FA34D',
          title: 'title 1',
          name: 'qweqweqweqw',
          description: 'bcbvcbcv',
          imageUrl: 'http://demandware.edgesuite.net/sits_pod20-adidas/dw/image/v2/aaqx_prd/on/demandware.static/-/Sites-adidas-products/en_US/dwd42862da/zoom/CG3000_01_standard.jpg?sw=500&sfrm=jpg'
        },
        {
          id: 'b',
          tid: '12FA34D',
          title: 'title 2',
          name: 'sadasdasdas',
          description: 'qweqweqweqw',
          imageUrl: 'http://demandware.edgesuite.net/sits_pod20-adidas/dw/image/v2/aaqx_prd/on/demandware.static/-/Sites-adidas-products/en_US/dwd42862da/zoom/CG3000_01_standard.jpg?sw=500&sfrm=jpg'
        },
        {
          id: 'c',
          tid: '12FA34D',
          title: 'title 3',
          name: 'qweqweqweqw',
          description: 'nmbmm',
          imageUrl: ''
        }]
      });
    }, 500);
    /*
    this.props.databroker.get('byTid', { tid: code })
      .then(this.handleLoadingSuccess.bind(this, code))
      .catch(this.handleLoadingError)
    */
  }

  renderItem = ({ item }) => {
    const { id, tid, name, description, imageUrl } = item;
    return (
      <TouchableOpacity onPress={ this.navigateToScanDisplay.bind(this, tid) }>
        <View style={ styles.list__item }>
          {
            imageUrl ?
              <Image
                source={{ uri: imageUrl }}
                style={ styles.item__image }
              />
              :
              <Image
                source={ require('../../assets/images/blank_image.png') }
                style={ styles.blank__image }
              />
          }
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
    const { isLoading, data } = this.state;
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
          <SelectList
            data={ data }
            renderItem={ this.renderItem }
          />
        </View>
      </Screen>
    );
  }
}
