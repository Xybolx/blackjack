import React, { useContext } from 'react';
import PropTypes from "prop-types";
import DealerDeckContext from "./dealerDeckContext";
import useBoolean from "../utils/useBoolean";
import Card from './card';
import "./dealerContainer.css";

const DealerContainer = ({ dealerHand, dealerScore, dealerWins }) => {

    // context
    const { dealerDeck } = useContext(DealerDeckContext);

    // useBoolean
    const isClicked = useBoolean(false);

    // de-structure isClicked
    const { value, toggle } = isClicked;

    // map dealerHand
    const dealerCards = dealerHand.map((card, index) =>
        <Card
            src={`${card.suit}.png`}
            src2="http://cdn.shopify.com/s/files/1/0200/7616/products/playing-cards-red-wheel-1_grande.png?v=1530155296"
            value={card.suit}
            numValue={!value ? card.numValue : card.altValue}
            altValue={card.altValue}
            onClick={toggle}
            key={index}
        />
    );

    // card propTypes
    Card.propTypes = {
        src: PropTypes.string,
        src2: PropTypes.string,
        value: PropTypes.string,
        numValue: PropTypes.number,
        altValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        onClick: PropTypes.func
    }

    return (
        <div className="container">
            {dealerDeck.length ? (
                <div className="info-count">
                    <h4 className="info">Dealer Wins:<span className="count">{dealerWins}</span></h4>
                    <h4 className="info">Dealer Score:<span className="count">{dealerScore}</span></h4>
                    {dealerCards}
                </div>
            ) : (
                    <h6>No Card Results</h6>
                )}
            <div className="drawButtonDiv">
            </div>
        </div>
    );
}

export default DealerContainer;