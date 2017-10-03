import { StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  screen: {
    
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
  register: {
    height: '100%',
    width: '100%',
    zIndex: 1
  },
  title: {
    zIndex: 3,
    height: 20,
    fontSize: 36,
    color: theme.color.primary
  }
});

export default styles;
