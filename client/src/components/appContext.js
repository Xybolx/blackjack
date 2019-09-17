import { createContext } from "react";

const AppContext = createContext({
    playerPurse: 500,
    playerBet: 0,
    playerScore: 0,
    playerWins: 0,
    playerHand: [],
    dealerScore: 0,
    dealerWins: 0,
    dealerHand: [],
    isGameOver: false,
    isOpenWin: false,
    isOpenLose: false
});

export default AppContext;