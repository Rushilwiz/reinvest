import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Portfolio from "./components/Portfolio";
import Bank from "./components/Bank";
import Profile from "./components/Profile";
import Browse from "./components/Browse";
import Nav from "./components/Nav";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";

import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route component={Signup} path="/register" />
          <Route component={Signin} path="/login" />
          <ProtectedRoute component={Bank} path="/banking" />
          <ProtectedRoute component={Browse} path="/browse" />
          <ProtectedRoute component={Profile} path="/profile" />
          <ProtectedRoute exact component={Portfolio} path="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
