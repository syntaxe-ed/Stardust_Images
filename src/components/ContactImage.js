import React from 'react'
import {Col} from 'react-bootstrap'
import Photo from '../img/stardust_images.jpg';

function ContactImage(props) {
	return (
		<Col className="contactImageStyle" sm={props.small} lg={props.large}>
			<img src={Photo} className="contactImage"/>
		</Col>
	)
}

export default ContactImage