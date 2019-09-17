import React from 'react';
import PropTypes from "prop-types";
import useToggle from "../utils/useToggle";
import "./handCard.css";

const DealerHandCard = ({ src, src2, value, numValue, id }) => {

    // useToggle
    const [isFlipped, setIsFlipped, toggleIsFlipped] = useToggle(false);


    DealerHandCard.propTypes = {
        src: PropTypes.string,
        src2: PropTypes.string,
        value: PropTypes.string,
        numValue: PropTypes.number,
        altValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }


    return (
        <span
            id={id}
            className={`${value} hand-card`}>
            <img
                style={{ height: 200 }}
                className="img-fluid"
                alt={numValue}
                src={isFlipped ? src : src2} />
        </span>
    );
}

export default DealerHandCard;