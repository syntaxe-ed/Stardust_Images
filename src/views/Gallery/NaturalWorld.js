import React from 'react'
import {Col, Row, Container} from 'react-bootstrap'
import GalleryCard from '../../components/GalleryCard'
import axios from 'axios'
import exhibitionStyle from '../../css/Exhibitions.css'

class NaturalWorld extends React.Component{
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
		return this.state.photos.map(currentPhoto => {
			if (currentPhoto.galleryTitle.toLowerCase() === "natural_world"){
				return <GalleryCard small={12} large={3} photo={currentPhoto.fileName} text={currentPhoto.fileName} folder="events/Exhibitions/Natural_World" key={currentPhoto._id}/>
			}
		})
	}

	render() {
		return (
			<Container fluid className="exhibitionContainer">
				<Row className="exhibitionRow">
					{this.photosList()}
				</Row>
			</Container>
		);
	}
}

export default NaturalWorld