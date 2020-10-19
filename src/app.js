import React, {Fragment} from 'react';

import {
  Switch,
  Route
} from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import Header from './modules/header'
import Main from './modules/main'

export default function App() {
  return(
    <Provider store={store}>
      <Fragment>
        <Header />
        <main role="main" className="MAIN">
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
          </Switch>
        </main>
      </Fragment>
    </Provider>)
}
