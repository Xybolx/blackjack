import React, { useEffect } from 'react';
import useToggle from '../utils/useToggle';
import HandCard from "./handCard";

const PlayerDropArea = ({ playerHand, setPlayerScore }) => {

    // state
    const [isAltValue, toggleIsAltValue] = useToggle(false);

    const playerCards = playerHand && playerHand.map((card) =>
        <HandCard
            toggleIsAltValue={toggleIsAltValue}
            src={`${card.suit}.png`}
            src2="blue-card-back.png"
            value={card.suit}
            numValue={isAltValue ? card.altValue : card.numValue}
            altValue={card.altValue}
            id={card.id}
            key={card.id}
        />
    );

    useEffect(() => {
        if (isAltValue) {
            const getPlayerScore = () => {
                let sum = 0;
                playerHand.map(card => {
                    sum = sum += card.numValue;
                    return setPlayerScore(sum);
                });
            }
            getPlayerScore();
        }
    }, [isAltValue, playerHand, setPlayerScore])

    return (
        <div>
            <h1>Player</h1>
            <div
                style={{ height: "100%" }}
            >
                {playerCards}
            </div>
        </div>
    );
};

export default PlayerDropArea;
