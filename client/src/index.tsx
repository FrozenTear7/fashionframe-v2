import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import App from './App';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4a148c',
      light: '#7c43bd',
      dark: '#12005e',
    },
    secondary: {
      main: '#8c1454',
      light: '#c04b80',
      dark: '#5a002b',
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
