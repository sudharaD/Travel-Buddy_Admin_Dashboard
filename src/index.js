
import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AdminLayout from "layouts/Admin.js";
import Login from "../src/views/Login"

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<BrowserRouter>
  <Switch>
    <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
    <Route path="/login"> <Login /> </Route> 
    <Redirect from="/" to="/login" />
  </Switch>
</BrowserRouter>);
