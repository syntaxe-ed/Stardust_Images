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
<<<<<<< HEAD
		axios.get(`${process.env.REACT_APP_IP_ADDRESS}/gallery`)
=======
		axios.get('http://192.168.1.206:5000/gallery')
>>>>>>> b0f53d04a468b5a03bfd310813e67d57f7edef4a
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
			if (currentPhoto.galleryTitle.toLowerCase() === "events"){
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