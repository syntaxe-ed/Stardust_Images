import React from 'react';
import {Row, Container, Nav} from 'react-bootstrap';
import GalleryStyle from '../css/Gallery.css'
import ImageCard from '../components/ImageCard'
import axios from 'axios';

class Gallery extends React.Component{
	constructor(props) {
		super(props)
		this.state = {photos: []};
		this.photosList = this.photosList.bind(this)
	}

	componentDidMount() {
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
			if (currentPhoto.galleryTitle === "gallery") {
				let ref = "/gallery/" + currentPhoto.reference
				return <ImageCard small={12} large={6} reference={ref} photo={currentPhoto.fileName} text={currentPhoto.fileName} folder="gallery" key={currentPhoto._id}/>
				
			}
		})
	}

	render() {
		return(
			<Container fluid className="galleryContainer" onContextMenu={(e)=> e.preventDefault()}>
				<Row className="galleryRow">
					<Nav>
						{this.photosList()}
					</Nav>
				</Row>
			</Container>
		)
	}
}

export default Gallery;