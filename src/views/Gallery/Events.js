import React from 'react'
import {Col, Row, Container} from 'react-bootstrap'
import EventsStyle from '../../css/Events.css'
import ImageCard from '../../components/ImageCard'
import axios from 'axios'

class Events extends React.Component{
	constructor(props) {
		super(props)
		this.state = {photos: []};
		this.photosList = this.photosList.bind(this)
	}

	async componentDidMount() {
		axios.get('http://192.168.1.113:5000/gallery')
			.then(response => {
				this.setState ({
					photos: response.data
				})
			})
			.catch((error) => {
				console.log(error)
			})

	}

	photosList() {
		return this.state.photos.map(currentPhoto => {
			if (currentPhoto.galleryTitle === "events"){
				let ref = "/gallery/events/" + currentPhoto.reference

				return <ImageCard small={12} large={4} reference={ref} photo={currentPhoto.fileName} text={currentPhoto.fileName} folder="events" key={currentPhoto._id}/>
			}
		})
	}

	render() {
		return (
			<Container fluid className="eventsContainer">
				<Row>
					{this.photosList()}
				</Row>
			</Container>
		);
	}
}

export default Events