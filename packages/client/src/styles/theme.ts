import { createMuiTheme } from '@material-ui/core/styles';
import { colorSchemes } from '@buildit/gravity-particles';

declare module '@material-ui/core/styles/zIndex' {
  interface ZIndex {
    backgroundShape: number;
    base: number;
  }
}

const { tealWhite } = colorSchemes;

export const colors = {
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
    paper: tealWhite.groupA.neutralAlt,
  },
  text: {
    primary: tealWhite.groupB.neutral,
  },
  custom: {
    lightText: 'rgb(0, 0, 0, 0.5)',
    completed: tealWhite.groupB.accent,
    uncompleted: tealWhite.groupA.accentDanger,
  },
};

let theme = createMuiTheme({
  typography: {
    htmlFontSize: 10, //62,5%
    fontSize: 16,
    button: {
      textTransform: 'none',
    },
    fontFamily:
      'Wipro Akkurat TT, Wipro Akkurat Mono TT, Roboto, Helvetica, Arial, sans-serif',
    h1: {
      fontSize: '8rem',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '2.4rem',
      fontWeight: 'bold',
    },
    h4: {
      fontSize: '1.6rem',
      fontWeight: 'bold',
    },
    body1: {
      fontSize: '1.6rem',
    },
    body2: {
      fontSize: '1.4rem',
    },
    subtitle1: {
      fontSize: '1.2rem',
    },
  },
  palette: {
    type: 'light',
    ...colors,
  },
  zIndex: {
    backgroundShape: -10,
    base: 1,
  },
  spacing: factor => `${factor}rem`,
});

theme = {
  ...theme,
  overrides: {
    MuiTab: {
      root: {
        fontWeight: theme.typography.fontWeightBold,
        fontSize: theme.typography.body1.fontSize,
        [theme.breakpoints.up('sm')]: {
          fontSize: theme.typography.body1.fontSize,
        },
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: '5.5rem',
        [theme.breakpoints.up('sm')]: {
          minWidth: '7rem',
        },
      },
    },
  },
};

export default theme;
