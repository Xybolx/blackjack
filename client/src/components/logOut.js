import React, { useEffect, useContext } from 'react';
import { Container } from 'reactstrap';
import UserContext from "./userContext";
import API from '../utils/API';
import "./logOut.css";

const LogOut = () => {

    // context
    const { user } = useContext(UserContext);

    // Logout function runs on component mount
    useEffect(() => {
        const logOut = () => {
            if (user) {
                API.logOut()
                .then(res => window.location = "/login")
                .catch(err => console.log(err))
            } else {
                window.location = "/login"
            }
        };
        logOut();
    }, [user]);

    return (
        <Container className="logout-container">
            <h2 className="logout-header">Logging Out...</h2>
        </Container>
    );
}

export default LogOut;