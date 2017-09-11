import { StyleSheet } from 'react-native';
import theme from '../../theme';

const headerHeight = 60;

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
    marginTop: headerHeight
  },
  missing: {
    display: 'flex',
    height: '100%',
    width: '100%',
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: headerHeight
  },
  nothing: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
    fontSize: 24,
    color: theme.color.error,
    textAlign: 'center'
  },
  button: {
    position: 'absolute',
    bottom: 20,
    zIndex: 3
  },
  sku: {
    color: theme.color.gray,
    fontSize: 28,
    marginTop: 10,
    marginBottom: 10
  },
  code: {
    color: theme.color.primary,
    fontSize: 28
  },
  details: {
    color: theme.color.gray,
    fontSize: 28,
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
