import React, { useContext } from 'react';
import PropTypes from "prop-types";
import PlayerDeckContext from "./playerDeckContext";
import useBoolean from "../utils/useBoolean";
import Card from './card';
import "./playerContainer.css";

const PlayerContainer = ({ playerHand, playerScore, playerWins }) => {

    // context
    const { playerDeck } = useContext(PlayerDeckContext);

    // useBoolean
    const isClicked = useBoolean(false);

    // de-structure isClicked
    const { value, toggle } = isClicked;

    // map playerHand
    const playerCards = playerHand.map((card, index) =>
        <Card
            src={`${card.suit}.png`}
            src2="http://cdn.shopify.com/s/files/1/0200/7616/products/playing-cards-red-wheel-1_grande.png?v=1530155296"
            value={card.suit}
            numValue={!value ? card.numValue : card.altValue}
            altValue={card.altValue}
            onClick={() => toggle}
            key={index}
        />
    );

    // card propTypes
    Card.propTypes = {
        src: PropTypes.string,
        src2: PropTypes.string,
        value: PropTypes.string,
        numValue: PropTypes.number,
        altValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }

    return (
        <div className="container">
            {playerDeck.length ? (
                <div className="info-count">
                    <h4 className="info">Player Wins:<span className="count">{playerWins}</span></h4>
                    <h4 className="info">Player Score:<span className="count">{playerScore}</span></h4>
                    {playerCards}
                </div>
            ) : (
                    <h6>No Card Results</h6>
                )}
            <div className="drawButtonDiv">
            </div>
        </div>
    );
}

export default PlayerContainer;