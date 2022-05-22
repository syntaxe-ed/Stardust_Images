import React from 'react'
import axios from 'axios'
import ImageCard from './ImageCard'
import GalleryCard from './GalleryCard'
import { Row, Container } from 'react-bootstrap'
import searchStyle from '../css/Search.css'
import usePromise from 'react-promise'

class SearchComponent extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			photos: [],
			items: null,
			title: ''
		}

		this.searchForItem = this.searchForItem.bind(this);
	}



	componentDidMount() {
		axios.get(`${process.env.REACT_APP_IP_ADDRESS}/gallery/search/${this.props.searchTerm}`)
			.then(response => {
				this.setState({
					photos: response.data
				})
				this.searchForItem();
			})
			.catch((error) => {
				console.log(error)
			})
	}

	async searchForItem() {
		let ref = ''
		let items = [];

		for (const currentPhoto of this.state.photos) {
			let galleryTitle = currentPhoto.galleryTitle.toString() + '/';
			if (currentPhoto.galleryTitle === "gallery") {
				ref = '/gallery/' + currentPhoto.reference
			} else {
				ref = '/gallery/' + currentPhoto.galleryTitle + '/' + currentPhoto.reference
			}

			if (currentPhoto.reference === "") {
				this.setState({
					title: currentPhoto.galleryTitle.toString().toLowerCase()
				})
				while (this.state.title !== 'gallery') {
					await axios.get(`${process.env.REACT_APP_IP_ADDRESS}/pages/parent/${this.state.title}`)
					.then(response => {
						if (response.data !== 'gallery') {
							galleryTitle = response.data + '/' + galleryTitle;
							console.log('gallery', galleryTitle);
						}
						this.setState({
							title: response.data
						})
					})
					.catch((error) => {
						console.log(error)
					});
				}
				items.push(<GalleryCard small={12} large={3} photo={currentPhoto.fileName} folder={galleryTitle} text={currentPhoto.fileName} key={currentPhoto._id} />)
			} else {
				items.push(<ImageCard small={12} large={3} reference={ref} photo={currentPhoto.fileName} folder={currentPhoto.galleryTitle} text={currentPhoto.fileName} key={currentPhoto._id} />)
			}
		}

		this.setState({
			items: items
		})
	}

	render() {
		return (
			<Container fluid className="searchContainer">
				<Row>
					{this.state.items}
				</Row>
			</Container>
		)
	}
}

export default SearchComponent