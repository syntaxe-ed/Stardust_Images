import React from 'react';
import GiftsStyle from '../css/Gifts.css';
import { Row, Container, Nav } from 'react-bootstrap';
import Axios from 'axios';
import ImageCard from '../components/ImageCard';
import GalleryCard from '../components/GalleryCard';


class Gifts extends React.Component {

    constructor(props) {
		super(props)
		this.state = { pages: [], cardType: 'gallery'};
	}

    async componentDidMount() {
        if (this.props.match.params.productTitle) {
            await Axios.get(`${process.env.REACT_APP_IP_ADDRESS}/products/${this.props.match.params.productTitle}`)
			.then(response => {
                const pages = [];
                response.data.forEach((page, i) => {
                    pages.push(<GalleryCard small={12} large={3} index={i} items={response.data} photo={page.image} text={page.title} folder={page.folder} key={page._id} cost={page.cost}/>)
                })

                this.setState({
                    pages: pages
                })
                this.setState({
                    cardType: 'gallery'
                })
			})
			.catch((error) => {
				console.log(error)
			})
        } else {
            await Axios.get(`${process.env.REACT_APP_IP_ADDRESS}/products/pages`)
			.then(response => {
                const pages = [];
                for (const page of response.data) {
                    pages.push(<ImageCard small={12} large={response.data.length > 2 ? 4 : 6} reference={'/gifts/' + page.reference} photo={'Comissions'} text={page.title} folder={'events'} key={page._id} />)
                }
                this.setState({
                    pages: pages
                })
                this.setState({
                    cardType: 'image'
                })
			})
			.catch((error) => {
				console.log(error)
			})
        }
	}


    render() {
        return (
            <Container fluid className={this.state.cardType === 'image' ? "galleryContainer" : "exhibitionContainer"} onContextMenu={(e) => e.preventDefault()}>
				<Row className={this.state.cardType === 'image' ? "galleryRow": ""}>
					<Nav>
						{this.state.pages}
					</Nav>
				</Row>
            </Container>
        )
    }
}

export default Gifts;