import React from "react";
import { Button } from "reactstrap";
import "./btn.css";

const Btn = ({ color, size, onClick, disabled, img, name, type, tag }) => {

    return (
        <Button
        tag={tag}
        type={type}
        color={color}
        size={size}
        onClick={onClick}
        disabled={disabled}
        >
            {img}
            <div>
                {name}
            </div>
        </Button>
    );
}

export default Btn;