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