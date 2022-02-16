import React from 'react';
import { Redirect } from 'react-router-dom';
import {UploadStyle} from "../css/Upload.css"

function Upload() {

	//TODO get username/password from database and check against credentials

	return (
		!localStorage.getItem('accessToken')  ? <Redirect to={{pathname: 'login'}} /> :
		<div className="uploadContainer">
		</div>
	);
}

export default Upload