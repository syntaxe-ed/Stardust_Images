import React from "react";

class Login extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <label for="username">Username:</label>
                <input type="text" id="username" name="username"></input>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password"></input>

                <button>Login</button>
            </div>
        )   
    }
}

export default Login;