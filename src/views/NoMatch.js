import React from 'react'
import ErrorStyle from '../css/Error.css'

function NoMatch() {
	return (
		<div className="errorContainer">
			<div className="messageContainer">
				<h1 className="errorMessage">Oops! There was an issue</h1>
				<br />
				<p1>We are working hard to resolve it, please click <a className="homeLink" href='/'>here</a> to return home</p1>
			</div>
		</div>
	);
}

export default NoMatch