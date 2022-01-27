import React from "react";
import Axios from "axios";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

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
        window.location.replace = `${process.env('APP_IP_ADDRESS')}/upload`;
        window.location.reload(false);
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
            <div>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" onChange={this.setUsername}></input>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" onChange={this.setPassword}></input>

                <button onClick={this.checkUser}>Login</button>
            </div>
        )   
    }
}

export default withRouter(LoginForm);