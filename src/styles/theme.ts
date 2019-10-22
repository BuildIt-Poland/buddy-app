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
      fontSize: '3rem',
    },
    h2: {
      fontSize: '2.4rem',
    },
    h3: {
      fontSize: '2rem',
    },
    h4: {
      fontSize: '1.8rem',
    },
    h5: {
      fontSize: '1.6rem',
    },
    subtitle1: {
      fontSize: '1.4rem',
    },
    subtitle2: {
      fontSize: '1.2rem',
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
