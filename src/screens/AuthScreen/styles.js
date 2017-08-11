import { StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  screen: {
    backgroundColor: theme.color.darkBackground
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 2
  },
  login: {
    height: '100%',
    width: '100%',
    zIndex: 1
  }
});

export default styles;
