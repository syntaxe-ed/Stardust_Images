import React from 'react';
import PageFooter from '../css/Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram} from '@fortawesome/free-brands-svg-icons'
import {Row, Container, Col} from 'react-bootstrap';

function Footer() {
	return (
		<footer>
			<Container fluid>
				<Row>
					<Col className="Column" sm={12} lg={4}>
						Website developed by <a href="http://edward35linton.github.io">Edward Linton</a>
					</Col>
					<Col className="Column" sm={12} lg={4}>
						All Images Copyright ©Jennifer Linton {new Date().getFullYear()}
					</Col>
					<Col className="Column" sm={12} lg={4}>
						<a href="https://www.instagram.com/stardustimages_jen/" ><FontAwesomeIcon className="instagram" icon={faInstagram} size="lg"/></a>
						<a href="https://www.facebook.com/Stardust-Images-by-Jennifer-Linton-207022339901547"><FontAwesomeIcon className="facebook" icon={faFacebook} size="lg"/></a>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;