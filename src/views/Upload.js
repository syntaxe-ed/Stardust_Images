import React from 'react';
import { Redirect } from 'react-router-dom';

function Upload() {

	return (
		!localStorage.getItem('accessToken') ? <Redirect to={{pathname: 'login'}} /> :
		<div>

		</div>
	);
}

export default Upload