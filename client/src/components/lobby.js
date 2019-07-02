import React, { Component } from "react";
import Title from "./title";
import Cards from "./cards";
import Users from "./users";

class Lobby extends Component {

    render() {
        return (
            <div>
                <Title />
                <Users />
                <Cards />
            </div>
        );
    };
};

export default Lobby;