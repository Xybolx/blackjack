import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import "./btn.css";

const BtnLogOut = ({ type, color, size, onClick, disabled, name, img }) => {

    return (
        <span>
            <Button
                tag={Link} to="/logout"
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
        </span>
    );
}

export default BtnLogOut;