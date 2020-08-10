import React from 'react'
import axios from 'axios'
import ImageCard from './ImageCard'
import GalleryCard from './GalleryCard'
import {Row, Container} from 'react-bootstrap'
import searchStyle from '../css/Search.css'

class SearchComponent extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			photos: []
		}

		this.searchForItem = this.searchForItem.bind(this);
	}



	componentDidMount() {
	    axios.get('http://192.168.1.113:5000/gallery')
	      .then(response => {
	        this.setState ({
	          photos: response.data
	        })
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

		return this.state.photos.map(currentPhoto => {
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
						if (currentPhoto.galleryTitle.toLowerCase() === "exhibitions"){
							galleryTitle = "events/Exhibitions"
						}
						return <GalleryCard small={12} large={3} photo={currentPhoto.fileName} folder={galleryTitle} text={currentPhoto.fileName} key={currentPhoto._id}/>
					} else {
						return <ImageCard small={12} large={3} reference={ref} photo={currentPhoto.fileName} folder={currentPhoto.galleryTitle} text={currentPhoto.fileName} key={currentPhoto._id}/>
					}

					
				}
			}
		})
	}

	render() {
		return (
			<Container fluid className="searchContainer">
				<Row>
					{this.searchForItem()}
				</Row>
			</Container>
		)
	}
}

export default SearchComponent