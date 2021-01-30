import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Portfolio from "./components/Portfolio";
import Bank from "./components/Bank";
import Profile from "./components/Profile";
import Browse from "./components/Browse";
import Login from "./components/Login";

import "./App.css";

function App() {
    const adminUser = {

        email: "admin@admin.com",
        password: "admin123"

    }

    const [user, setUser] = useState({name: "", email: ""});
    const [error, setError] = useState("");

    const Login = details => {
      console.log(details);

    }

    const Logout = () => {
      console.log("Logout");
    }

  return (

    <div className="App">
      <BrowserRouter> 
      <Switch>
        <Route component={Bank} path="/banking" />
        <Route component={Browse} path="/browse" />
        <Route component={Profile} path="/profile" />
        <Route component={Portfolio} path="/" />
      </Switch>
    </BrowserRouter>
      {(user.email !== "") ? (
        <div className="welcome">
          <h2>Welcome, <span>{user.name}</span></h2>
          <button>Logout</button>
          </div>
      ) : (
        <Login/>
      )}

    </div>
  );
}

export default App;
