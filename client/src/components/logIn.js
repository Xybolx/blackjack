import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Col, Container } from "reactstrap";
import API from "../utils/API";
import UserContext from "./userContext";
import useForm from "../utils/useForm";
import useBoolean from "../utils/useBoolean";
import Btn from "./btn";
import "./login.css";

const LogIn = () => {

    // context
    const { setUser } = useContext(UserContext);

    // state
    const [values, handleChange, handleClearForm] = useForm();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // de-structure values
    const { email, password } = values;

    const redirect = () => {
        setTimeout(() => setIsLoggedIn(true), 1500);
    };

    const getUser = () => {
        API.getUser()
            .then(res => setUser(res.data))
            .catch(err => console.log(err))
    };

    const handleFormSubmit = ev => {
        ev.preventDefault();
        if (email && password) {
            API.logIn({ email, password })
                .then(res => getUser())
                .then(() => handleClearForm())
                .then(() => redirect())
                .catch(err => console.log(err));
        }
    };

    if (isLoggedIn) {
        return <Redirect to="/game" />
    }

    return (
        <Container className="login-container">
            <Col sm="12" md={{ size: 6, offset: 3 }}>
                <h5><i className="fas fa-user-plus"></i> Login</h5>
                <h5>or</h5>
                <h5><i className="far fa-address-card"></i> Sign Up<Link to="/">&nbsp;Here</Link>!</h5>
                <form onSubmit={handleFormSubmit} id="loginForm">
                    <label className="label" htmlFor="email">Email</label>
                    <input id="emailInput" type="email" name="email" placeholder="📧 Email" value={email || ""} onChange={handleChange} className="form-control" required />
                    <label className="label" htmlFor="password">Password</label>
                    <input id="passwordInput" type="password" name="password" placeholder=" 🔑 Password" className="form-control" value={password || ""} onChange={handleChange} required />
                    <div className="form-button text-center">
                        <Btn
                            type="submit"
                            color="link"
                            size="md"
                            disabled={!email || !password}
                            img={<img className="img-fluid btn-img" alt="" src="card-hand.png" />}
                            name="Log In!"
                        />
                    </div>
                </form>
            </Col>
        </Container>
    );
};

export default LogIn;