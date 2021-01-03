import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";

import AddUser from "./components/AddUser";
import SignIn from "./components/SignIn";
import Login from "./components/Login";
import Information from "./components/Information";
import Error from "./components/Error";

import "./App.css";

function App() {
  return (
    <div className="container">
      <h2>Weight Tracker</h2>
      <Router>
        <GlobalProvider>
          <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/newuser" component={AddUser} />
            <Route path="/existinguser" component={Login} />
            <Route path="/entries" component={Information} />
            <Route path="*" component={Error} />
          </Switch>
        </GlobalProvider>
      </Router>
    </div>
  );
}

export default App;
