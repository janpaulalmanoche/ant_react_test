import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect, Router } from "react-router-dom";
import "./App.css";
import { Layout } from "antd";
import Dashboard from "./components/pages/Dashboard";
import Login from "./components/pages/Login";
import User from "./components/User";
import Product from "./components/Product";
const App = ({ children }) => {
  const { Header, Content } = Layout;

  const [loggedInStatus, SetLoggedInStatus] = useState("not_logged_in");
  const [user, setUser] = useState({});

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/login"
            render={(props) => (
              <Login {...props} loggedInStatus={loggedInStatus} />
            )}
          />

          {/* {localStorage.getItem("token") ? (
            <Route
              exact
              path="/"
              // render={(props) => (
              //   <Dashboard {...props} loggedInStatus={loggedInStatus} />
              // )}
              component={Dashboard} 
            />
          ) : (
            <Redirect to="/login" />
          )} */}

          <Route exact path="/users" component={User} />
          <Route exact path="/" component={Dashboard} />

          <Route exact path="/products" component={Product} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
