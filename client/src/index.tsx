import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <CssBaseline>
      <App />
    </CssBaseline>
  </BrowserRouter>,
  document.getElementById('root')
);
