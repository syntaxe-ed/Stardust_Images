import React from 'react'
import Jennifer from '../img/about/jennifer.jpg'
import AboutStyle from '../css/About.css'
import {Card, CardDeck, Container, Row, Col, Image, Jumbotron} from 'react-bootstrap';
import AboutImage from '../components/AboutImage'
import AboutText from '../components/AboutText'

class About extends React.Component {

	render() {
		return (
			<Container fluid className="aboutContainer">
				<Row className="aboutRow">
					<AboutImage small={12} large={5} picture={Jennifer} />
					<AboutText small={12} large={5} />
				</Row>
			</Container>
		);
	}
}

export default About;