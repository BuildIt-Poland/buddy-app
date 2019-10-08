import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { colorSchemes } from '@buildit/gravity-particles';

const { tealWhite } = colorSchemes;

let theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 320,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    htmlFontSize: 10, //62,5%
    button: {
      textTransform: 'none',
    },
    h1: {
      fontWeight: 550,
    },
  },
  palette: {
    type: 'light',
    primary: {
      main: tealWhite.groupB.accent,
      // contrastText: tealWhite.groupA.neutral,
    },
    secondary: {
      main: tealWhite.groupB.neutral,
      // contrastText: tealWhite.groupA.neutral,
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
