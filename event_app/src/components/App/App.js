import React from "react";
import { Route } from "react-router-dom";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
import { Portal } from "../Portal/Portal";
import "./App.css";


export class App extends React.Component {
  render() {
    return (
      <main id="app">
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route
          exact
          path="/(newevent|events|editevent)/"
          
        />
        <Portal />
      </main>
    );
  }
}
