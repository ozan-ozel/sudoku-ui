import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import * as serviceWorker from './serviceWorker';

import App from './app'

// https://dev.to/siradji/react-without-create-react-app-start-building-your-react-project-like-a-professional-1hih
// https://blog.marcnuri.com/react-babel-webpack-sass-application/

ReactDom.render(
  <React.StrictMode>
    <CookiesProvider>
      <Router>
        <App></App>
      </Router>
    </CookiesProvider>
  </React.StrictMode> , document.getElementById('root'))

serviceWorker.unregister();