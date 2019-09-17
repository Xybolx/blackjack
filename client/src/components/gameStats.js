import React from "react";

const GameStats = ({ playerBet, playerPurse, playerWins, dealerWins, playerScore }) => {

    return (
        <div>
            <div>
                <span className="info">Player Bet:<span className="count">${playerBet}</span></span>
                <span className="info">Player Purse:<span className="count">${playerPurse}</span></span>
            </div>
            <div>
                <span className="info">Player Wins:<span className="count">{playerWins}</span></span>
                <span className="info">Dealer Wins:<span className="count">{dealerWins}</span></span>
                <span className="info">Player Score:<span className="count">{playerScore}</span></span>
            </div>
        </div>
    );
};

export default GameStats; 