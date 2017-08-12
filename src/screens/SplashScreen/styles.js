import { StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  screen: {
    backgroundColor: theme.color.lightBackground
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  },
  splash: {
    height: 100,
    width: 100
  }
});

export default styles;
