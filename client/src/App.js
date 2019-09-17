import React, { useState, useMemo } from 'react';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import PlayerDeckContext from "./components/playerDeckContext";
import UserContext from "./components/userContext";
import useArray from "./utils/useArray";
import Drag from "./components/drag";
import Title from "./components/title";
import SignUp from "./components/signUp";
import LogIn from "./components/logIn";
import LogOut from "./components/logOut";
// import GameContainer from "./components/gameContainer";
import './App.css';

const App = () => {

  // state
  const [playerDeck, setPlayerDeck, addToPlayerDeck, removeFromPlayerDeck, clearPlayerDeck] = useArray([]);
  const [user, setUser] = useState(null);

  // memo
  const playerDeckValue = useMemo(() => ({ playerDeck, setPlayerDeck, addToPlayerDeck, removeFromPlayerDeck, clearPlayerDeck }), [playerDeck, setPlayerDeck, addToPlayerDeck, removeFromPlayerDeck, clearPlayerDeck]);
  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);


  return (
    <Router>
      <div className="App">
        <Title />
        <Switch>
          <PlayerDeckContext.Provider value={playerDeckValue}>
            <UserContext.Provider value={userValue}>
              <Route exact path="/" component={Drag} />
              <Route exact path="/login" component={LogIn} />
              <Route exact path="/logout" component={LogOut} />
            </UserContext.Provider>
          </PlayerDeckContext.Provider>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

