import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import useToggle from "../utils/useToggle";
import "./handCard.css";

const HandCard = ({ src, src2, value, numValue, id, toggleIsAltValue }) => {

    // useToggle
    const [isFlipped, toggleIsFlipped] = useToggle(false);

    HandCard.propTypes = {
        toggleIsAltValue: PropTypes.func,
        src: PropTypes.string,
        src2: PropTypes.string,
        value: PropTypes.string,
        numValue: PropTypes.number,
        altValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }

    useEffect(() => {
        const toggleTimer = setTimeout(() => {
            toggleIsFlipped();
        }, 1000);
        return () => {
            clearTimeout(toggleTimer);
        };
    }, [toggleIsFlipped]);


    return (
        <span
            id={id}
            onClick={toggleIsFlipped}
            onDoubleClick={toggleIsAltValue}
            className={`${value} hand-card`}>
            <img
                style={{ height: 175 }}
                className="img-fluid"
                alt={numValue}
                src={isFlipped ? src : src2} />
        </span>
    );
}

export default HandCard;