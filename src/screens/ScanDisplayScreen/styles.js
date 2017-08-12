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
  button: {
    position: 'absolute',
    bottom: 20,
    zIndex: 3
  }
});

export default styles;
