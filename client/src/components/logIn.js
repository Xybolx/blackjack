import React from "react";
import { Link } from "react-router-dom";
import API from "../utils/API";
import useForm from "./useForm";
import Title from "./title";

const LogIn = () => {

    // state
    const [values, handleChange, handleClearForm] = useForm();

    // de-structure values
    const { email, password } = values;

    const handleFormSubmit = ev => {
        ev.preventDefault();
        if (email && password) {
            API.logIn({
                email,
                password
            })
                .then(res => handleClearForm())
                .then(() => window.location = "/lobby")
                .catch(err => console.log(err));
        }
    };

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-lg-4 md-4 sm-2 xs-2">
                    <div className="card">
                        <div className="card-body">
                            <div id="subTitle" className="card-title">
                                <Title />
                                <h5><i className="fas fa-user-plus"></i> Login</h5>
                                <h5>or</h5>
                                <h5><i className="far fa-address-card"></i> Sign Up<Link to="/">&nbsp;Here</Link>!</h5>
                            </div>
                        </div>
                        <div className="card-footer">
                            <form onSubmit={handleFormSubmit} id="loginForm">
                                <label className="label" htmlFor="email">Email</label>
                                <input id="emailInput" type="email" name="email" placeholder="📧 Email" value={email} onChange={handleChange} className="form-control" required />
                                <label className="label" htmlFor="password">Password</label>
                                <input id="passwordInput" type="password" name="password" placeholder=" 🔑 Password" className="form-control" value={password} onChange={handleChange} required />
                                <br />
                                <button className="btn btn-primary btn-block" type="submit"> <i className="fas fa-user-plus"></i> Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;