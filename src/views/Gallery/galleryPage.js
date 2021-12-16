import React from 'react';
import {Row, Container, Nav} from 'react-bootstrap';
import GalleryStyle from '../../css/Gallery.css'
import ImageCard from '../../components/ImageCard';
import Axios from 'axios';
import { useParams } from 'react-router';

class GalleryPage extends React.Component{
	constructor(props) {
		super(props)
		this.state = {photos: [], pages: []};
		this.photosList = this.photosList.bind(this)
	}

	async componentDidMount() {
		await Axios.get(`${process.env.REACT_APP_IP_ADDRESS}/gallery`)
		.then(response => {
			this.setState ({
				photos: response.data
			})
		})
		.catch((error) => {
			console.log(error)
		})

		await Axios.get(`${process.env.REACT_APP_IP_ADDRESS}/pages`)
		.then(response => {
			this.setState ({
				pages: response.data
			})
		})
		.catch((error) => {
			console.log(error)
		})

  }

  	getLinks(){
		console.log(this.props.match.params[0]);
		const links = [];
		for (const page of this.state.pages) {
			if (page.parentPage === this.props.page) {
				links.push(page);
			}
		}
		return links;
	}

	getTitle(){
		let title = this.props.match.params[0];
		if (this.props.match.params[0] === '') {
			title = this.props.page.toLowerCase();
		} else {
			title = this.props.match.params[0].split('/');
			title = title[title.length - 1];
		}
		console.log(title);
		return title
	}

	photosList() {
		const photos = this.getLinks();
		const title = this.getTitle();
		if (photos.length !== 0) {
			return photos.map((page) => {
				let ref = `/${title}/${page.title.toLowerCase()}`; 
				return <ImageCard small={12} large={6} reference={ref} photo={page.fileName} text={page.fileName} folder={title} key={page._id}/>
			})
		} else {
			return this.state.photos.map(currentPhoto => {
				if (currentPhoto.galleryTitle === title) {
					let ref = `/${title}/` + currentPhoto.reference
					return <ImageCard small={12} large={6} reference={ref} photo={currentPhoto.fileName} text={currentPhoto.fileName} folder={title} key={currentPhoto._id}/>
					
				}
			})
		}
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

export default GalleryPage;