import React from 'react'
import {Col, Image} from 'react-bootstrap'

function AboutImage(props) {
	return (
		<Col sm={props.small} lg={props.large} className="aboutPhoto">
			<div >
				<Image className="aboutImage" src={props.picture} rounded />
			</div>
		</Col>
	)
}

export default AboutImage