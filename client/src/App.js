import React, { useContext, useMemo, useState } from 'react';
import './App.css';
import SignUp from "./components/signUp";
import LogIn from "./components/logIn";
import Lobby from "./components/lobby";
import CardContainer from "./components/cardContainer";
import PlayerHandContext from "./components/playerHandContext";
import DealerHandContext from "./components/dealerHandContext";
// import CardsContext from "./components/cardsContext";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

const App = props => {

  // state
  const [dealerHand, setDealerHand] = useState("");
  const [playerHand, setPlayerHand] = useState("");
  // const [cards, setCards] = useState([]);

  // memo
  const dealerValue = useMemo(() => ({ dealerHand, setDealerHand }), [dealerHand, setDealerHand]);
  const playerValue = useMemo(() => ({ playerHand, setPlayerHand }), [playerHand, setPlayerHand]);
  // const cardsValue = useMemo(() => ({ cards, setCards }), [cards, setCards]);



  return (
    <Router>
      <div className="App">
        <Switch>
          <DealerHandContext.Provider value={dealerValue}>
            <PlayerHandContext.Provider value={playerValue}>
                <Route exact path="/" component={CardContainer} />
                {/* <Route exact path="/" component={SignUp} /> */}
                <Route exact path="/login" component={LogIn} />
                <Route exact path="/lobby" component={Lobby} />
            </PlayerHandContext.Provider>
          </DealerHandContext.Provider>
        </Switch>
      </div>
    </Router>
  );
}



export default App;

