import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import App from './App';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#004d40',
      light: '#39796b',
      dark: '#00251a',
    },
    secondary: {
      main: '#8a352a',
      light: '#be6253',
      dark: '#580400',
    },
  },
});

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
