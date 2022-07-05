import React, { useState } from 'react';
import {Row, Col, Nav, Modal, Button, Container, Carousel} from 'react-bootstrap'
import exhibitionStyle from '../css/Exhibitions.css'

function GalleryCard(props) {
		const [index, setIndex] = useState(props.index);

		let imageThumb = require(`../img/${props.folder}${props.photo}.jpg`)

		let image = require(`../img/${props.items[index].folder}${props.items[index].image}.jpg`)
		let image2 = new Image()
        image2.src = image
        let vertical = false
        if (image2.height <  image2.width) {
            vertical = true
        }

		let images = [];
		for(let i = 0; i < props.items.length; i++) {
			images.push(<Carousel.Item><img src={require(`../img/${props.items[i].folder}${props.items[i].image}.jpg`)} className='display-image' style={vertical ? {'maxWidth': '100%'} : {'maxWidth': '44.5%'}}/> </Carousel.Item>);
		}

		const [show, setShow] = React.useState(false);
  		const handleClose = () => setShow(false);
  		const handleShow = () => setShow(true);
		const onClick = (eventKey, event) => {
			setIndex(eventKey);
		};
		const [material, setMaterial] = React.useState('Canvas');
		const [size, setSize] = React.useState('Small');
		const name = image.split('/')[3].split('.')[0]
		return(
			<>
				<Col sm={props.small} lg={vertical ? 2 : 1} className="galleryCard">
						<div  onClick={handleShow}>
							<img 
								src={imageThumb}
								className="galleryCardImage"
							/> 
						</div>
				</Col>

				<Modal show={show} onHide={handleClose} dialogClassName="modal">
			        <Modal.Header closeButton>
			        	<Modal.Title>
			        		Purchase {props.folder.includes('products') ? 'Item' : 'Image'}
			        	</Modal.Title>
			        </Modal.Header>

			        <Modal.Body className='display-container'>
			        	<Row>
				        	<Col sm={12} lg={props.folder.includes('products') ? 10 : 8}>
				        		{/* <img className='display-image'
						        	src={image}
						        	style={vertical ? {'maxWidth': '100%'} : {'maxWidth': '44.5%'}}
					        	/> */}
								<Carousel className="CarouselHolder" interval={null} keyboard={true} activeIndex={index}
									onSelect={(eventKey, event) => {onClick(eventKey, event)}}>
									{images}
								</Carousel>
				        	</Col>

							{props.folder.includes('products') ? (
								<Col sm={12} lg={2} className="purchase-gift">
									<h1>£{(props.items[index].cost).toFixed(2)}</h1>
									<Button onClick={handleClose} className="gift-button buy-button snipcart-add-item rounded-pill" data-item-id="1" data-item-price={props.items[index].cost} data-item-url="/" data-item-name={name}
									data-item-image={image}>
										Add to Basket
									</Button>
								</Col>
							) : (
								<Col sm={12} lg={4} className="purchase">
									<Row className="purchase-row">
										<Col sm={6} lg={4}>
											<p>Style: </p>
										</Col>
										<Col sm={6} lg={8}>
											<select name="material" id="material" className="selectBox rounded-pill" value={material} onChange={(d) => {setMaterial(d.target.value)}}>
												<option value="Canvas">Canvas</option>
												<option value="Print">Print</option>
											</select>
										</Col>
									</Row>
									<Row className="purchase-row">
										<Col sm={6} lg={4}>
											<p>Size: </p>
										</Col>
										<Col sm={6} lg={8}>
											<select name="style" id="style" className="selectBox rounded-pill" value={size} onChange={(d) => {setSize(d.target.value)}}>
												<option value="Small">Small</option>
												<option value="Medium">Medium</option>
												<option value="Large">Large</option>
											</select>
										</Col>
									</Row>
									<Button onClick={handleClose} className="buy-button snipcart-add-item rounded-pill" data-item-id="1" data-item-price="50.00" data-item-url="/" data-item-name={name}
									data-item-image={image} data-item-custom1-name="Material" data-item-custom1-options="Canvas|Print[-5.00]" data-item-custom1-value={material}
									data-item-custom2-name="Size" data-item-custom2-options="Small|Medium[+10.00]|Large[+20.00]" data-item-custom2-value={size}>
										Add to Basket
									</Button>
				        		</Col>
							)}

				        	
			        	</Row>
			        </Modal.Body>


		      	</Modal>
			</>
		);
}

function useForceUpdate(){
	const [value, setValue] = useState(0);
	return () => setValue(value => value + 1)
}

export default GalleryCard