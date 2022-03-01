import React from "react";
import Axios from "axios";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import {Row, Col} from "react-bootstrap"
import LoginStyle from "../css/Login.css"

class LoginForm extends React.Component {
    constructor() {
        super()

        this.state = {
            firstAttempt: true,
            username: null,
            password: null
        }
        this.checkUser = this.checkUser.bind(this);
        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.redirect = this.redirect.bind(this);
    }

    setUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    setPassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    redirect() {
        window.location = (`/upload`);
    }

    async checkUser() {
        await Axios.post(`${process.env.REACT_APP_IP_ADDRESS}/auth/login`, {username: this.state.username, password: this.state.password})
			.then(response => {
                localStorage.setItem('accessToken', response.data.token);
                this.redirect();
			})
			.catch((error) => {
				this.setState({
                    firstAttempt: false
                })
			})
    }

    render() {
        return (
            <form class="form-horizontal formContainer" onSubmit={this.checkUser}>
                <div class="container form-group">
                        <Row className="row justify-content-center my-auto">
                            <label htmlFor="username" className="control-label col-3 my-auto">Username:</label>
                            <input type="text" className="form-control col-5 rounded-pill" id="username" name="username" onChange={this.setUsername}></input>
                        </Row>
                        <Row className="row justify-content-center my-auto">
                            <label htmlFor="password" className="control-label col-3 my-auto">Password:</label>
                            <input type="password" className="form-control col-5 rounded-pill" id="password" name="password" onChange={this.setPassword}></input>
                        </Row>
                        <Row className="row justify-content-center my-auto">
                            <button type="Submit" onClick={this.checkUser} class="btn btn-primary rounded-pill">Login</button>
                        </Row>
                </div>
            </form>
        )   
    }
}

export default withRouter(LoginForm);