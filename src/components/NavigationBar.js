import React, {Redirect}from 'react';
import {Nav, Navbar, Form, FormControl, Button} from 'react-bootstrap';
import logo from "../img/stardust_images.png"
import SearchBar from './SearchBar'
import Navigation from '../css/Navigation.css'


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
				
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav>
						<Nav.Item><Nav.Link href="/about">About</Nav.Link></Nav.Item>
						<Nav.Item><Nav.Link href="/gallery">Gallery</Nav.Link></Nav.Item>
						<Nav.Item><Nav.Link href="/shop">Shop</Nav.Link></Nav.Item>
						<Nav.Item><Nav.Link href="/contact">Contact</Nav.Link></Nav.Item>
						<Nav.Item><Nav.Link href="https://stardustimagesblog.wordpress.com/">Blog</Nav.Link></Nav.Item>
					</Nav>
					<Nav className="ml-auto" onSubmit={this.handleSubmit}>
						<Form inline >
							<FormControl placeholder="Search" className = "mr-sm-2" onChange={this.handleChange} value={this.state.searchText}/>
							<br></br><br></br>
							{/* <Button className="btn btn-secondary mx-auto" type="submit">Submit</Button> */}
						</Form>
					</Nav>
				</Navbar.Collapse>
				
				<Nav className="ml-auto bag-container">
					<div>
						<svg xmlns="http://www.w3.org/2000/svg" width="32" height="35" fill="grey" className="bi bi-bag-fill snipcart-checkout" viewBox="0 0 16 16">
								<path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"/>
						</svg>
						<span className="snipcart-items-count"></span>
					</div>
				</Nav>
				<Navbar.Toggle area-controls="basic-navbar-nav" />
			</Navbar>
		)
	}	
}

export default NavigationBar 