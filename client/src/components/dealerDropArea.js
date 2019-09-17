import React from 'react';
import HandCard from "./handCard";

const DealerDropArea = ({ dealerHand }) => {

    const dealerCards = dealerHand && dealerHand.map(card =>
        <HandCard
            src={`${card.suit}.png`}
            src2="blue-card-back.png"
            value={card.suit}
            numValue={card.numValue}
            altValue={card.altValue}
            id={card.id}
            key={card.id}
        />
    );

    return (
        <div>
            <h1>Dealer</h1>
            <div
                style={{ height: "100%" }}
            >
                {dealerCards}
            </div>
        </div>
    );
};

export default DealerDropArea;
