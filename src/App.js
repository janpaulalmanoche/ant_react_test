import React, { useState } from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  Router,
} from "react-router-dom";
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
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/login" component={Login} />
      <Route path="/users" component={User} />
      <Route path="/products" component={Product} />
    </Switch>
  );
};

export default App;
