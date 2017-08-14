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
    font: 'Open sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, sans-serif',
    size: 16
  },
  color: {
    primary: colors.blue,
    accent: colors.gray,
    lightBackground: colors.white,
    darkBackground: colors.darkBlue,
    header: colors.black,
    ...colors
  },
  loading: {
    size: 80
  }
};

export default theme;
