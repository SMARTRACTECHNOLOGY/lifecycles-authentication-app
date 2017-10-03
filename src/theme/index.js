import { Platform } from 'react-native';

const colors = {
  black: '#000000',
  white: '#ffffff',
  darkGray: '#333333',
  gray: '#777777',
  lightGray: '#AAAAAA',
  lightestGray: '#f2f2f2',
  blue: '#1489aa',
  darkBlue: '#03566d',
  red: '#e74c3c',
  green: '#1abc9c',
  orange: '#e67e22',
  darkorange: '#d35400',
  yellow: '#f1c40f'
};

const theme = {
  typography: {
    font: (Platform.OS === 'ios') ? 'Helvetica' : 'Roboto',
    size: 16
  },
  color: {
    primary: colors.blue,
    accent: colors.gray,
    lightBackground: colors.white,
    darkBackground: colors.darkBlue,
    header: colors.black,
    error: colors.red,
    ...colors
  },
  loading: {
    size: (Platform.OS === 'ios') ? 1 : 80
  }
};

export default theme;
