import { createTheme } from '@mui/material/styles';

const globalTheme = createTheme({
  palette: {
    primary: {
      light: '#cccccc',
      main: '#f2f2f2',
      dark: '#a5a5a5',
      contrastText: '#36382e',
    },
    secondary: {
      light: '#7f7f7f',
      main: '#36382e',
      dark: '#595959',
      contrastText: '#f2f2f2',
    },
  },
  typography: {
    fontFamily: ['Roboto Mono', 'monospace'].join(','),
  },
});

export default globalTheme;
