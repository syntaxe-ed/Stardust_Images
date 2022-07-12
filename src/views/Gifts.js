import React from 'react';
import GiftsStyle from '../css/Gifts.css';
import { Row, Container, Nav, Carousel } from 'react-bootstrap';
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
                let verticals = [];
                let images = [];
                let names = [];
                for(let i = 0; i < response.data.length; i++) {
                    let image = require(`../img/${response.data[i].folder}${response.data[i].image}.jpg`)  
                    let image2 = new Image()
                    image2.src = image
                    let vertical = false
                    if (image2.height <  image2.width) {
                        vertical = true
                    }
                    names.push(image.split('/')[3].split('.')[0]);
                    verticals.push(vertical);


                    images.push(<Carousel.Item><img src={require(`../img/${response.data[i].folder}${response.data[i].image}.jpg`)} className='display-image' 
                    style={{ 'maxWidth': '100%' }}
                    /> </Carousel.Item>);
                }

                response.data.forEach((page, i) => {
                    pages.push(<GalleryCard name={names[i]} vertical={verticals[i]} small={12} large={3} index={i} items={response.data} images={images} photo={page.image} text={page.title} folder={page.folder} key={page._id} cost={page.cost}/>)
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