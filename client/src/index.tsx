import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import App from './App';
import './index.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00bcd4',
      light: '#62efff',
      dark: '#008ba3',
    },
    secondary: {
      main: '#00bcd4',
      light: '#62efff',
      dark: '#008ba3',
    },
  },
  typography: {
    fontFamily: ['Cardo', 'serif'].join(','),
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
