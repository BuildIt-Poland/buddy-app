import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { colorSchemes } from '@buildit/gravity-particles';

const { tealWhite } = colorSchemes;

let theme = createMuiTheme({
  typography: {
    htmlFontSize: 10, //62,5%
    button: {
      textTransform: 'none',
    },
    fontFamily:
      'Wipro Akkurat TT, Wipro Akkurat Mono TT, Roboto, Helvetica, Arial, sans-serif',
    h1: {
      fontWeight: 550,
    },
  },
  palette: {
    type: 'light',
    primary: {
      main: tealWhite.groupB.accent,
      contrastText: tealWhite.groupA.neutral,
    },
    secondary: {
      main: tealWhite.groupB.neutral,
      contrastText: tealWhite.groupA.neutral,
    },
    background: {
      default: tealWhite.groupA.neutral,
    },
    text: {
      primary: tealWhite.groupB.neutral,
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
