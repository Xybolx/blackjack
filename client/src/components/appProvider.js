import React, { useState, useMemo } from "react";
import useSetState from "../utils/useSetState";
import AppContext from "./appContext";

const AppProvider = props => {

    const [appState, setAppState] = useSetState({
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

    const AppContextValue = useMemo(() => ({ appState, setAppState }), [appState, setAppState]);

    return (
        <AppContext.Provider value={AppContextValue}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppProvider;