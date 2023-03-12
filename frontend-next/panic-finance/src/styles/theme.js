import { createTheme } from '@mui/material/styles';

// Light theme
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0070f3',
    },
    secondary: {
      main: '#ff5a5f',
    },
  },
});

// Dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0070f3',
    },
    secondary: {
      main: '#ff5a5f',
    },
  },
});

export { lightTheme, darkTheme };
