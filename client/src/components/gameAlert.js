import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Alert, Fade } from "reactstrap";
import "./gameAlert.css";

const GameAlert = ({ isOpen, color, text }) => {

    const el = useRef();

    const onEnd = ev => {
        console.log("onEnd");
        let savedEl = el.current;
        let url = "glass2.gif";
        savedEl.style.backgroundImage = 'url(' + url + ')'
        savedEl.style.backgroundRepeat = "no-repeat";
        savedEl.style.backgroundSize = "400px";
        savedEl.style.backgroundPosition = "center";
    };

    return (
        <div ref={el} className="game-alert">
            <Alert
                className="jumbotron"
                isOpen={isOpen}
                color={color}
                onAnimationEnd={ev => onEnd(ev)}
            >
                <div className="insideAlert">{text}</div>
            </Alert>
        </div>
    );
}

export default GameAlert;