import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { lime, deepOrange } from '@material-ui/core/colors';
import App from './App';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: lime[200],
    },
    secondary: {
      main: deepOrange[200],
    },
  },
});

ReactDOM.render(
  <BrowserRouter>
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </CssBaseline>
  </BrowserRouter>,
  document.getElementById('root')
);
