import React from 'react';
import {Form, Container, Row, Col, Button} from 'react-bootstrap';
import ContactImage from '../components/ContactImage'
import ContactForm from '../components/ContactForm'
import ContactStyle from '../css/Contact.css';

function Contact() {
	return (
		<Container fluid className="contactContainer">
			<Row className="contactRow">
				<Col sm={0} lg={1} />
				<ContactImage small={12} large={5} />
				<ContactForm small={12} large={5} />
				<Col sm={0} lg={1} />
			</Row>
		</Container>
	);
}

export default Contact