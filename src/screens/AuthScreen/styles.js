import { StyleSheet } from 'react-native';
import Platform from 'Platform';
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
    zIndex: 9999
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    margin: 10
  },
  subtext: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    margin: 10
  },
  button: Platform.select({
    ios: {
      overflow: 'hidden'
    },
    android: {
      elevation: 2,
      backgroundColor: theme.color.primary
    }
  })
});

export default styles;
