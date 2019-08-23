import React, { useState, useEffect } from "react";
import Deck from 'card_deck';
import PropTypes from "prop-types";
import Card from "./card";

const CardContainer = () => {

    let deck = new Deck();
    let newDeck = deck.shuffle();

    const [myDeck, setMyDeck] = useState(newDeck);
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);

    const playerCards = playerHand.map((card, index) =>
        <Card
            src={`${card}.png`}
            value={card.card}
            key={index}
        />
    );

    const dealerCards = dealerHand.map((card, index) =>
        <Card
            src={`${card}.png`}
            value={card.card}
            key={index}
        />
    );

    const playerDraw = () => {
        setPlayerHand([...playerHand, deck.draw(1)]);
        return setMyDeck(deck.left());
    };

    const dealerDraw = () => {
        setDealerHand([...dealerHand, deck.draw(1)]);
        return setMyDeck(deck.left());
    };

    Card.propTypes = {
        src: PropTypes.string,
        value: PropTypes.string
    }

    return (
        <>
            <div className="container">
                {myDeck.length ? (
                    <div style={{ display: "inline-block" }}>
                        <h3>Dealer Cards</h3>
                        {dealerCards}
                        <h3>Player Cards</h3>
                        {playerCards}
                    </div>
                ) : (
                        <h6>No Card Results</h6>
                    )}
                <div className="drawButtonDiv">
                    <button onClick={playerDraw} className="btn btn-warning btn-md">Player Draw</button>
                    <button onClick={dealerDraw} className="btn btn-warning btn-md">Dealer Draw</button>
                </div>
            </div>
        </>
    );
}

export default CardContainer;