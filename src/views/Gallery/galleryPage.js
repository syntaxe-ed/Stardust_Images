import React from 'react';
import { Row, Container, Nav, Carousel } from 'react-bootstrap';
import GalleryStyle from '../../css/Gallery.css'
import ImageCard from '../../components/ImageCard';
import Axios from 'axios';
import GalleryCard from '../../components/GalleryCard';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

class GalleryPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = { photos: [], pages: [], displayPhotos: [], fileName: '', links: true };
		this.photosList = this.photosList.bind(this)
	}

	async componentDidMount() {
		const id = this.setId();

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

	setId() {
		let id;
		if (this.props.match.params.eventTitle) {
			id = this.props.match.params.eventTitle;
		} else if (this.props.match.params.subGalleryTitle) {
			id = this.props.match.params.subGalleryTitle;
		} else if (this.props.match.params.galleryTitle) {
			id = this.props.match.params.galleryTitle;
		} else {
			id = 'gallery'
		}
		return id;
	}

	async photosList() {
		const title = this.getTitle();
		const photos = await this.getLinks(title);
		let i = 0;
		const pages = [];
		let verticals = [];
		let images = [];
		let names = [];

		await Promise.all(this.state.photos.map((currentPhoto, index) => {
			let image = require(`../../img/${this.state.fileName + '/'}${currentPhoto.fileName}.jpg`)
			let image2 = new Image()
			image2.src = image
			let vertical = false
			if (image2.height < image2.width) {
				vertical = true
			}
			names.push(image.split('/')[3].split('.')[0]);
			verticals.push(vertical);


			images.push(<Carousel.Item><img src={require(`../../img/${this.state.fileName + '/'}${currentPhoto.fileName}.jpg`)} className='display-image'
				style={{ 'maxWidth': '100%' }}
			/> </Carousel.Item>);
		})).then(() => {})

		await Promise.all(this.state.photos.map((currentPhoto, index) => {
			if (currentPhoto.galleryTitle === title) {
				i++;
				if (photos.length === 0) {
					return <GalleryCard name={names[index]} vertical={verticals[index]} small={12} large={3} index={index} items={this.state.photos} images={images} photo={currentPhoto.fileName} text={currentPhoto.fileName} folder={this.state.fileName + '/'} key={currentPhoto._id} cost={50}/>
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
				<div className={this.state.links ? "galleryRow" : ""}>
					<Nav>
						{this.state.displayPhotos}
					</Nav>
				</div>
			</Container>
		)
	}
}

export default GalleryPage;