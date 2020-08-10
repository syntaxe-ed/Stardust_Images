import React from 'react'
import {Col, Form, Button} from 'react-bootstrap'
import axios from 'axios'

class ContactForm extends React.Component{
	constructor(props) {
		super(props)

		this.state = {
			email: '',
			subject: '',
			message: ''
		}
		this.handleChange=this.handleChange.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const {name, value} = event.target;
		this.setState({
			[name]: value
		})
	}

	handleSubmit(event){
		event.preventDefault()
		let email = this.state.email
		let subject = this.state.subject
		let message = this.state.message

		axios.post('http://192.168.1.113:5000/send', {
			email,
			subject,
			message
		})
	}

	render(){
		return (
			<Col className="contactFormStyle" sm={this.props.small} lg={this.props.large}>
				<Form className="contactForm" onSubmit={this.handleSubmit}>
					<Form.Group controlId = "formContact">
						<Form.Label>Email Address</Form.Label>
						<Form.Control name="email" type="email" placeholder="Enter email" onChange={this.handleChange} value={this.state.email}/>
					</Form.Group>

					<Form.Group controlId = "formContact">
						<Form.Label>Subject</Form.Label>
						<Form.Control name="subject" type="text" placeholder="Subject" onChange={this.handleChange} value={this.state.subject}/>
					</Form.Group>

					<Form.Group controlId = "formContact">
						<Form.Label>Message</Form.Label>
						<Form.Control name="message" as="textarea" rows="10" placeholder="Message" onChange={this.handleChange} value={this.state.message}/>
					</Form.Group>
					<Button className="buttonStyle" variant="primary" type="submit">
						Send
					</Button>
				</Form>
			</Col>
		)
	}

	
}

export default ContactForm