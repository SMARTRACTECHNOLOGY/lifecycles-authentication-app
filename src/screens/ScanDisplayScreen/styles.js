import { StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  screen: {
    backgroundColor: theme.color.lightBackground
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1
  },
  data: {
    height: '100%',
    width: '100%',
    zIndex: 2,
    padding: 10,
    marginTop: 60
  },
  nothing: {
    height: '100%',
    width: '100%',
    zIndex: 2,
    padding: 10
  },
  button: {
    position: 'absolute',
    bottom: 20,
    zIndex: 3
  },
  sku: {
    color: theme.color.primary,
    fontSize: 32,
    marginTop: 10,
    marginBottom: 10
  },
  details: {
    color: theme.color.primary,
    fontSize: 32,
    marginBottom: 10
  },
  product: {
    display: 'flex',
    flexDirection: 'row',
    height: 100,
    width: '100%'
  },
  product__image: {
    display: 'flex',
    width: 100,
    height: 100,
    flexShrink: 0
  },
  product__info: {
    display: 'flex',
    width: '100%',
    height: 100,
    paddingLeft: 10,
    paddingRight: 10
  },
  info__name: {
    fontSize: 22,
    marginBottom: 5
  },
  info__description: {
    fontSize: 14
  },
  metadata: {
    marginTop: 10
  },
  metadata__info: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 60,
    borderTopColor: theme.color.lightestGray,
    borderTopWidth: 1
  },
  metadata__label: {
    display: 'flex',
    fontWeight: 'bold',
    color: theme.color.lightGray,
    fontSize: 24
  },
  metadata__value: {
    display: 'flex',
    paddingLeft: 20,
    flexGrow: 1,
    color: theme.color.black,
    fontSize: 24
  }
});

export default styles;
