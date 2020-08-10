import React, {Redirect}from 'react';
import {Nav, Navbar, Form, FormControl, Button} from 'react-bootstrap';
import logo from "../img/stardust_images.png"
import SearchBar from './SearchBar'

class NavigationBar extends React.Component{
	constructor() {
		super()

		this.state = {
			searchText: ''
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		const {value} = event.target
		this.setState({
			searchText: value
		})
	}

	handleSubmit(event) {
		event.preventDefault()
		window.location = (`/search/${this.state.searchText}`)
	}

	render() {
		return (
			<Navbar bg="light" expand="lg" className="NavBar2">
				<Navbar.Brand href="/">
					<img
						width="80"
						height="60"
						src={logo}
						alt="logo"
					/>
				</Navbar.Brand>
				<Navbar.Toggle area-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav>
						<Nav.Item><Nav.Link href="/about">About</Nav.Link></Nav.Item>
						<Nav.Item><Nav.Link href="/gallery">Gallery</Nav.Link></Nav.Item>
						<Nav.Item><Nav.Link href="/contact">Contact</Nav.Link></Nav.Item>
						<Nav.Item><Nav.Link href="https://stardustimagesblog.wordpress.com/">Blog</Nav.Link></Nav.Item>
					</Nav>

					<Nav className="ml-auto" onSubmit={this.handleSubmit}>
						<Form inline >
							<FormControl placeholder="Search" className = "mr-sm-2" onChange={this.handleChange} value={this.state.searchText}/>
							<br></br><br></br>
							<Button className="btn btn-secondary mx-auto" type="submit">Submit</Button>
						</Form>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	}	
}

export default NavigationBar 