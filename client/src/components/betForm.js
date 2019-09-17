import React from "react";
import { Col, Form, InputGroup, InputGroupAddon, Input } from "reactstrap";
import Btn from "./btn";
import useForm from "../utils/useForm";

const BetForm = ({ playerBet, setPlayerBet, playerPurse, setPlayerPurse }) => {

    const [values, handleChange, handleClearForm] = useForm();

    const handleFormSubmit = ev => {
        ev.preventDefault();
        setPlayerBet(parseInt(values.bet));
        setPlayerPurse(playerPurse => playerPurse - values.bet);
        handleClearForm();
    }

    return (
        <Col sm="12" md={{ size: 6, offset: 3 }} style={playerBet === 0 ? { display: "block" } : { display: "none" }}>
            <Form onSubmit={handleFormSubmit}>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                    <Input
                        name="bet"
                        value={values.bet || ""}
                        onChange={handleChange}
                        placeholder="Amount"
                        min={10}
                        max={playerPurse}
                        type="number"
                        step="10"
                    />
                    <InputGroupAddon addonType="append">
                        <Btn
                            type="submit"
                            color="warning"
                            size="sm"
                            name="PlaceBet!"
                            disabled={!values.bet}
                        />
                    </InputGroupAddon>
                </InputGroup>
            </Form>
        </Col>
    );
};

export default BetForm;