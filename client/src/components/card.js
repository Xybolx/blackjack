import React, { useState, useRef } from 'react';
import useToggle from "../utils/useToggle";
import useDraggable from "../components/useDraggable";
import "./card.css";

const Card = ({ src, src2, value, numValue, id }) => {

    const el = useRef();

    useDraggable(el);

    // useToggle
    const [isFlipped, toggleIsFlipped] = useToggle(false);

    const onDragStart = (ev, id) => {
        console.log('dragStart: ' + id);
        ev.dataTransfer.setData("id", id);
    };

    const onDrag = ev => {
        console.log("onDrag");
    };

    const onDragEnd = () => {
        const flipTimer = setTimeout(toggleIsFlipped, 1000);
        console.log("dragEnd");
        return () => clearTimeout(flipTimer);
    };


    return (
        <div
            id={id}
            ref={el}
            draggable
            onDragStart={ev => onDragStart(ev, id)}
            onDrag={ev => onDrag(ev)}
            onDragEnd={onDragEnd}
            onDoubleClick={toggleIsFlipped}
            className={`${value} playing-card`}>
            <img
                style={{ height: 200 }}
                className="img-fluid"
                alt={numValue}
                src={isFlipped ? src : src2} />
        </div>
    );
}

export default Card;