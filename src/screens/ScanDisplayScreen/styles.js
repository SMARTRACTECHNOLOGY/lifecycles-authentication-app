import { StyleSheet } from 'react-native';
import theme from '../../theme';

const headerHeight = 60;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: theme.color.lightBackground
  },
  data: {
    height: '100%',
    width: '100%',
    zIndex: 2,
    padding: 10,
    marginLeft: 20,
    marginTop: headerHeight
  },
  missing: {
    height: '85%',
    width: '100%',
    zIndex: 0,
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
    zIndex: 0,
    fontSize: 24,
    color: theme.color.error,
    textAlign: 'center'
  },
  buttonView:{
    flexDirection: 'row',
    zIndex: 4,
    bottom: 20
  },
  button: {
    marginRight: 10,
    marginLeft: 10
  },
  update__button: {
    backgroundColor: theme.color.green
  },
  tag: {
    color: theme.color.gray,
    fontSize: 28,
    marginTop: 5,
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
  blank__image: {
    display: 'flex',
    width: 90,
    height: 90,
    flexShrink: 0,
    opacity: 0.5
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
    color: theme.color.lightGray,
    fontSize: 20
  },
  metadata__value: {
    display: 'flex',
    paddingLeft: 20,
    flexGrow: 1,
    color: theme.color.black,
    fontSize: 16
  }
});

export default styles;
