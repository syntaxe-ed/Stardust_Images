import React from 'react';
import {Carousel} from 'react-bootstrap';
import beach from "../img/landingpage/Events.jpg"
import island from "../img/landingpage/DSC_0063.jpg"
import isolation from "../img/landingpage/Landscapes.jpg"
import CarouselStyle from '../css/LandingCarousel.css'
import CarouselItem from './CarouselItem'

function LandingCarousel() {
	return (
		<Carousel className="CarouselHolder">
			<Carousel.Item><CarouselItem image={beach} alternate="beach" /></Carousel.Item>
			<Carousel.Item><CarouselItem image={island} alternate="island" /></Carousel.Item>
			<Carousel.Item><CarouselItem image={isolation} alternate="isolation" /></Carousel.Item>
		</Carousel>
	);
}

export default LandingCarousel;