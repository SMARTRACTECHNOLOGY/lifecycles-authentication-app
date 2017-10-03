import { StyleSheet } from 'react-native';
import theme from '../../theme';

const baseNavigationItem = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  height: '100%',
  width: '100%'
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: theme.color.lightBackground,
    height: '100%',
    width: '100%'
  },
  navigation: {
    height: '100%',
    width: '100%',
    paddingTop: 60
  },
  navigation__container: {
    height: '25%',
    width: '100%'
  },
  scan__navigation: {
    ...baseNavigationItem,
    backgroundColor: '#5AAFC7'
  },
  registrations__navigation: {
    ...baseNavigationItem,
    backgroundColor: '#3993AD'
  },
  settings__navigation: {
    ...baseNavigationItem,
    backgroundColor: '#7623A3'
  },
  help__navigation: {
    ...baseNavigationItem,
    backgroundColor: '#5B0F85'
  },
  item__image: {
    display: 'flex',
    backgroundColor: theme.color.transparent,
    height: '75%',
    width: '30%',
    padding: '5%'
  },
  image: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    opacity: 0.85
  },
  item__text: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '70%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingRight: 15
  },
  text: {
    fontSize: 20,
    color: theme.color.white,
    fontWeight: '300'
  },
  text__help: {
    marginTop: 5,
    fontSize: 14,
    color: theme.color.lightestGray,
    fontWeight: '100'
  },
  linearGradient: {
    flex: 1
  },
  shadow: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: -1,
    top: 0,
    left: 0,
    opacity: 0.90
  },
  rotated__shadow: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: -1,
    bottom: 0,
    left: 0,
    transform: [{ rotateX: '180deg' }],
    opacity: 0.75
  }
});

export default styles;
