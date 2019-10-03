import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { colorSchemes } from '@buildit/gravity-particles';

const { tealWhite } = colorSchemes;

let theme = createMuiTheme({
  typography: {
    htmlFontSize: 10, //62,5%
  },
  palette: {
    primary: {
      main: tealWhite.groupB.neutral,
      contrastText: tealWhite.groupA.neutral,
    },
    secondary: {
      main: tealWhite.groupB.accent,
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
