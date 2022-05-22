import React from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

function Login() {
	return (
        localStorage.getItem('accessToken') ? <Redirect to={{pathname: 'upload'}} /> :
		<div>
            <LoginForm />
		</div>
	);
}

export default Login