import React, { Component } from 'react';
import './App.css';
import SocketContext from './components/socketContext';
import * as io from 'socket.io-client';
import SignUp from "./components/signUp";
import LogIn from "./components/logIn";
import Lobby from "./components/lobby";
import Room from "./components/room";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

const socket = io();

const App = props => (
  <Router>
    <div className="App jumbotron jumbotron-fluid">
      <Switch>
        <SocketContext.Provider value={socket}>
          <Route exact path="/" component={SignUp} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/lobby" component={Lobby} />
          <Route exact path="/room" component={Room} />
        </SocketContext.Provider>
      </Switch>
    </div>
  </Router>

);

export default App;

