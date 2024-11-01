import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light', 
    primary: {
      main: '#000000', 
      contrastText: '#FFFFFF', 
      accent: '#CCCCCC', 
      delete: '#888888', 
      deleteHover: '#FF0000', 
    },
    secondary: {
      main: '#FFFFFF',
      dark: '#CCCCCC', 
      border: '#AAAAAA', 
      contrastText: '#000000', 
    },
    background: {
      default: '#FFFFFF', 
      paper: '#F5F5F5', 
    },
    text: {
      primary: '#000000', 
      secondary: '#444444', 
      disabled: '#AAAAAA', 
      hint: '#888888', 
      default:'#B6C2CF',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h1: {
      fontSize: '1.5rem',
      fontWeight: 300,
      color: '#000000', 
    },
    h2: {
      fontSize: '1rem',
      fontWeight: 300,
      color: '#000000', 
    },
    button: {
      color: '#FFFFFF',
    },
  },
});

export default theme;
