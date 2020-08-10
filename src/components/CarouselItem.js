import React from 'react'
import {Carousel} from 'react-bootstrap'
import CarouselStyle from '../css/LandingCarousel.css'

function CarouselItem(props) {
	return (
		<img className="CarouselImage" src={props.image} alternate={props.alt} />
	)
}

export default CarouselItem