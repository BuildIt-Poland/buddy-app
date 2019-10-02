import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

//TODO: Review and redo colors.
const gravityColors = {
  primary: '#4d4848',
  secondary: '#008d7c',
  primaryText: '#ffffff',
  secondaryText: '#ffffff',
  background: '#ffffff',
};

let theme = createMuiTheme({
  typography: {
    htmlFontSize: 10, //62,5%
  },
  palette: {
    primary: {
      main: gravityColors.primary,
      contrastText: gravityColors.primaryText,
    },
    secondary: {
      main: gravityColors.secondary,
      contrastText: gravityColors.secondaryText,
    },
    background: {
      default: gravityColors.background,
    },
    text: {
      primary: gravityColors.primary,
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
