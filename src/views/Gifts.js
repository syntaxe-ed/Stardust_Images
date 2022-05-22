import React from 'react';
import GiftsStyle from '../css/Gifts.css';
import { Row, Container, Nav } from 'react-bootstrap';
import Axios from 'axios';
import ImageCard from '../components/ImageCard';

class Gifts extends React.Component {

    constructor(props) {
		super(props)
		this.state = { pages: []};
	}

    async componentDidMount() {
		await Axios.get(`${process.env.REACT_APP_IP_ADDRESS}/products/pages`)
			.then(response => {
                const pages = [];
                for (const page of response.data) {
                    pages.push(<ImageCard small={12} large={response.data.length > 2 ? 4 : 6} reference={'/gifts/' + page.reference} photo={'Comissions'} text={page.title} folder={'events'} key={page._id} />)
                }
                this.setState({
                    pages: pages
                })
			})
			.catch((error) => {
				console.log(error)
			})

	}


    render() {
        return (
            <Container fluid className="giftsContainer">
                <Row className={"galleryRow"}>
					<Nav>
						{this.state.pages}
					</Nav>
				</Row>
            </Container>
        )
    }
}

export default Gifts;