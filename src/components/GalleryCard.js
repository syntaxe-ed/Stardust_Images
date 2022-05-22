import React from 'react';
import {Row, Col, Nav, Modal, Button, Container} from 'react-bootstrap'
import exhibitionStyle from '../css/Exhibitions.css'

function GalleryCard(props) {
		let image = require(`../img/${props.folder}${props.photo}.jpg`)
		let image2 = new Image()
        image2.src = image
        let vertical = false
        if (image2.height <  image2.width) {
            vertical = true
        }

		const [show, setShow] = React.useState(false);
  		const handleClose = () => setShow(false);
  		const handleShow = () => setShow(true);
		const [material, setMaterial] = React.useState('Canvas');
		const [size, setSize] = React.useState('Small');
		const name = image.split('/')[3].split('.')[0]
		return(
			<>
				<Col sm={props.small} lg={vertical ? 2 : 1} className="galleryCard">
						<div  onClick={handleShow}>
							<img 
								src={image}
								className="galleryCardImage"
							/> 
						</div>
				</Col>

				<Modal show={show} onHide={handleClose} dialogClassName="modal">
			        <Modal.Header closeButton>
			        	<Modal.Title>
			        		Purchase Image
			        	</Modal.Title>
			        </Modal.Header>

			        <Modal.Body className='display-container'>
			        	<Row>
				        	<Col sm={12} lg={8}>
				        		<img className='display-image'
						        	src={image}
						        	style={vertical ? {'maxWidth': '100%'} : {'maxWidth': '44.5%'}}
					        	/>
				        	</Col>

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
			        	</Row>
			        </Modal.Body>


		      	</Modal>
			</>
		);
}

export default GalleryCard