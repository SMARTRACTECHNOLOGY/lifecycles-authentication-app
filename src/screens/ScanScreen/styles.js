import { StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  screen: {
    backgroundColor: theme.color.lightBackground
  },
  scan: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 375,
    width: 350
  },
  scan__image: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    opacity: 0.1,
    zIndex: 1
  },
  icon: {
    width: 24,
    height: 24
  },
  help: {
    position: 'absolute',
    top: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    zIndex: 2
  },
  help__text: {
    fontSize: 72,
    color: theme.color.primary,
    opacity: 0.3,
    fontWeight: '300'
  },
  simulateTap: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    zIndex: 3
  }
});

export default styles;
