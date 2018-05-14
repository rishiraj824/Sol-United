// @flow

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "./index.css";
import "./c3jscustom.css";
import App from "./App";
import Home from "./Home";


const rootElement = document.getElementById("root");

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/dashboard' component={App}/>
    </Switch>
  </main>
)


if (rootElement) {
  ReactDOM.render(<Router>
      <Main />
    </Router>, rootElement);
} else {
  throw new Error("Could not find root element to mount to!");
}
