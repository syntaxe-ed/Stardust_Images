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
			items: null
		}

		this.searchForItem = this.searchForItem.bind(this);
	}



	componentDidMount() {
		axios.get(`${process.env.REACT_APP_IP_ADDRESS}/gallery`)
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

	searchForItem() {
		let searchTerm = this.props.searchTerm;
		let keyWords = []
		let currentWord = ''
		let ref = ''
		let galleryTitle = ''

		const items = [];
		for (const currentPhoto of this.state.photos) {
			if (currentPhoto.keywords) {
				keyWords = currentPhoto.keywords.split(',')
			}

			for (let i = 0; i < keyWords.length; i++) {
				currentWord = keyWords[i].trim()
				if (currentWord.toLowerCase() === searchTerm.toLowerCase()) {
					if (currentWord.galleryTitle === "gallery") {
						ref = '/gallery/' + currentPhoto.reference
					} else {
						ref = '/gallery/' + currentPhoto.galleryTitle + '/' + currentPhoto.reference
					}

					if (currentPhoto.reference === "") {
						let title = currentPhoto.galleryTitle.toLowerCase();
						while (title !== "gallery") {
							axios.get(`${process.env.REACT_APP_IP_ADDRESS}/pages/parent/${title}`)
								.then(response => {
									galleryTitle = response.data + '/' + galleryTitle;
									title = response.data;
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
			}

		}
		return items;
	}

	render() {
		return (
			<Container fluid className="searchContainer">
				<Row>
					{this.state.itemss}
				</Row>
			</Container>
		)
	}
}

export default SearchComponent