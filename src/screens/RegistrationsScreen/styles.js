import { StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    width: '100%',
    backgroundColor: theme.color.lightBackground
  },
  title__container: {
    display: 'flex',
    height: 50,
    justifyContent: 'center',
    flexShrink: 0,
    paddingLeft: 10
  },
  title: {
    fontSize: 22,
    color: theme.color.gray
  },
  list: {
    height: '100%',
    width: '100%',
    backgroundColor: theme.color.lightBackground,
    paddingTop: 60
  },
  list__item: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 125,
    backgroundColor: theme.color.white,
    borderWidth: 1,
    borderColor: theme.color.lightestGray,
    borderStyle: 'solid'
  },
  item__image: {
    display: 'flex',
    width: 125,
    height: 125,
    flexShrink: 0
  },
  blank__image: {
    display: 'flex',
    width: 125,
    height: 125,
    flexShrink: 0,
    opacity: 0.5
  },
  item__meta: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: '100%',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10
  },
  item__tid: {
    color: theme.color.primary,
    fontSize: 20,
    marginTop: 10,
    marginBottom: 5
  },
  item__name: {
    color: theme.color.black,
    fontSize: 18
  },
  item__description: {
    color: theme.color.gray,
    fontSize: 16
  }
});

export default styles;
