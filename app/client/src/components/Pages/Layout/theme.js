import {defaultTheme} from 'react-admin';
import {createTheme} from "@mui/material/styles";

export const Theme = createTheme({
  ...defaultTheme,
  palette: {
    primary: {
      main: '#0074ce',
    },
    secondary: {
      light: '#5f5fc4',
      main: '#283593',
      dark: '#001064',
      contrastText: '#fff',
    },
    background: {
      default: '#fcfcfe',
    },
    mode: 'light',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});