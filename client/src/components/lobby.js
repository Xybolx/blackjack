import React from "react";
import Title from "./title";
import Users from "./users";
import SocketContext from './socketContext';
import * as io from "socket.io-client";

const socket = io("http://localhost:3001/")

function Lobby() {

        return (
            <div>
                <Title />
                <SocketContext.Provider value={socket}>
                <Users />
                </SocketContext.Provider>
            </div>
        );
    };

export default Lobby;