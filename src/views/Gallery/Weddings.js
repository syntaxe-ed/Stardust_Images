import React from 'react'
import {Col, Row, Container} from 'react-bootstrap'
import EventsStyle from '../../css/Events.css'
import ImageCard from '../../components/ImageCard'
import axios from 'axios'

class Weddings extends React.Component{
	constructor(props) {
		super(props)
		this.state = {photos: []};
		this.photosList = this.photosList.bind(this)
	}

	async componentDidMount() {
		axios.get('http://192.168.1.206:5000/gallery')
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
		let text = ""
		return this.state.photos.map(currentPhoto => {
			if (currentPhoto.galleryTitle.toLowerCase() === "weddings"){
				let ref = "/gallery/events/Weddings/" + currentPhoto.reference

				if (currentPhoto.fileName === "Natural_World") {
					text = "Natural World"
				}

				return <ImageCard small={12} large={4} reference={ref} photo={currentPhoto.fileName} text={text} folder="events/Exhibitions" key={currentPhoto._id}/>
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

export default Weddings