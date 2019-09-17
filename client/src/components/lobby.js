import React, { useContext } from "react";
import useForm from "../utils/useForm";
import AppContext from "./appContext";
import Btn from "./btn";

const Lobby = () => {

    const { appState, setAppState } = useContext(AppContext);

    const [values, handleChange, handleClearForm] = useForm();

    const { playerBet } = appState;

    const { bet } = values;

    const handleSubmit = ev => {
        ev.preventDefault();
        let parsedBet = parseInt(bet);
        setAppState({ playerBet: playerBet + parsedBet });
        handleClearForm();
    };

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="number"
                        name="bet"
                        value={bet || 0}
                        onChange={handleChange}
                    />
                    <Btn
                    type="submit"
                    color="warning"
                    size="md"
                    name="Place Bet" 
                    />
                </form>
            </div>
            <div>
                <div>Player Bet: $<span>{playerBet || 0}</span></div>
            </div>
        </div>
    );
};

export default Lobby;