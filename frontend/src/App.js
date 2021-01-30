import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Portfolio from "./components/Portfolio";
import Bank from "./components/Bank";
import Profile from "./components/Profile";
import Browse from "./components/Browse";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Bank} path="/banking" />
        <Route component={Browse} path="/browse" />
        <Route component={Profile} path="/profile" />
        <Route component={Portfolio} path="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
