import React from 'react';
import { Row, Container, Nav } from 'react-bootstrap';
import GalleryStyle from '../../css/Gallery.css'
import ImageCard from '../../components/ImageCard';
import Axios from 'axios';
import GalleryCard from '../../components/GalleryCard';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

class GalleryPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = { photos: [], pages: [], displayPhotos: [], fileName: '', links: true};
		this.photosList = this.photosList.bind(this)
	}

	async componentDidMount() {
		let id = '';
		if (this.props.match.params.eventTitle) {
			id = this.props.match.params.eventTitle;
		} else if (this.props.match.params.subGalleryTitle) {
			id = this.props.match.params.subGalleryTitle;
		} else if (this.props.match.params.galleryTitle) {
			id = this.props.match.params.galleryTitle;
		} else {
			id = 'gallery'
		}

		await Axios.get(`${process.env.REACT_APP_IP_ADDRESS}/gallery/${id}`)
			.then(response => {
				this.setState({
					photos: response.data
				})
			})
			.catch((error) => {
				console.log(error)
			})

		await Axios.get(`${process.env.REACT_APP_IP_ADDRESS}/pages/${id}`)
			.then(response => {
				this.setState({
					pages: response.data
				})
			})
			.catch((error) => {
				console.log(error)
			})

		await this.photosList();
	}

	async getLinks(title) {
		const links = [];
		for (const page of this.state.pages) {
			if (page.parentPage.toLowerCase() === title.toLowerCase()) {
				links.push(page);
			}
		}
		if (links.length === 0) {
			this.setState({
				links: false
			})
		}
		return links;
	}

	getTitle() {
		let title;
		if (this.props.match.params.eventTitle) {
			title = this.props.match.params.eventTitle;
			this.setState({
				fileName: `${this.props.match.params.galleryTitle}/${this.props.match.params.subGalleryTitle}/${this.props.match.params.eventTitle}`
			});
		} else if (this.props.match.params.subGalleryTitle) {
			title = this.props.match.params.subGalleryTitle;
			this.setState({
				fileName: `${this.props.match.params.galleryTitle}/${this.props.match.params.subGalleryTitle}`
			});
		} else if (this.props.match.params.galleryTitle) {
			title = this.props.match.params.galleryTitle;
			this.setState({
				fileName: `${this.props.match.params.galleryTitle}`
			});
		} else {
			title = 'gallery';
			this.setState({
				fileName: `gallery`
			});
		}
		return title
	}

	async photosList() {
		const title = this.getTitle();
		const photos = await this.getLinks(title);
		console.log(photos);
		let i = 0;
		await Promise.all(this.state.photos.map(currentPhoto => {
			if (currentPhoto.galleryTitle === title) {
				i++;
				if (photos.length === 0){
					return <GalleryCard small={12} large={3} photo={currentPhoto.fileName} text={currentPhoto.fileName} folder={this.state.fileName} key={currentPhoto._id}/>
				}
				let ref = `${title}/` + currentPhoto.reference.toLowerCase()
				return <ImageCard small={12} large={photos.length > 2 ? 4 : 6} reference={ref} photo={currentPhoto.fileName} text={currentPhoto.fileName} folder={this.state.fileName} key={currentPhoto._id} />
			}
		})).then((newPhotos) => {
			this.setState({
				displayPhotos: newPhotos
			})
		});

		if (i === 0) {
			this.setState({
				displayPhotos: <Redirect to='/error' />
			})
		}

	}

	render() {
		return (
			<Container fluid className={this.state.links ? "galleryContainer" : "exhibitionContainer"} onContextMenu={(e) => e.preventDefault()}>
				<Row className={this.state.links ? "galleryRow": "exhibitionRow"}>
					<Nav>
						{this.state.displayPhotos}
					</Nav>
				</Row>
			</Container>
		)
	}
}

export default GalleryPage;