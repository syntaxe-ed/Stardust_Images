import React from 'react';
import {Col, Nav} from 'react-bootstrap'

function ImageCard(props) {
		let image = require('../img/' + props.folder + "/" + props.photo + '.jpg')
		console.log(props.reference)

		return(
			<Col sm={props.small} lg={props.large}>
				<Nav.Item>
					<div className="imageCard">
						<Nav.Link href={props.reference}>
							<img 
								src={image}
								className="imageCardImage"
							/>
							<h1 className="imageCardText">{props.text}</h1>
						</Nav.Link>
					</div>
				</Nav.Item>
			</Col>
		);
}

export default ImageCard