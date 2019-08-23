import React, { useState } from 'react';

const Card = props => {

    const [isFlipped, setIsFlipped] = useState(false);

    const flip = () => {
        setIsFlipped(!isFlipped)
    };

    return (
        <span onClick={flip} className={`${props.value} playing-card`}>
            <img style={{ maxHeight: 200 }} className="img-fluid" alt="" src={!isFlipped ? props.src : "https://www.maxplayingcards.com/en/wp-content/uploads/2014/07/BlackoutKingdom_LimitedBack.png" } />
        </span>
    );
}

export default Card;