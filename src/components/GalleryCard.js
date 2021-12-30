import React from 'react';
import {Row, Col, Nav, Modal, Button, Container} from 'react-bootstrap'
import exhibitionStyle from '../css/Exhibitions.css'

function GalleryCard(props) {
		let image = require(`../img/${props.folder}/${props.photo}.jpg`)
		let image2 = new Image()
        image2.src = image
        let vertical = false
        if (image2.height <  image2.width) {
            vertical = true
        }

		const [show, setShow] = React.useState(false);
  		const handleClose = () => setShow(false);
  		const handleShow = () => setShow(true);

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

			        <Modal.Body>
			        	<Row>
				        	<Col sm={12} lg={10}>
				        		<img 
						        	src={image}
									className='modalImage'
					        	/>
				        	</Col>

				        	<Col sm={12} lg={2} className="purchase">
				        		<p>Style: 
				        			<select name="style" id="style" className="selectBox">
				        				<option value="canvas">Canvas</option>
				        				<option value="print">Print</option>
				        			</select>
				        		</p>

				        		<p>Size: 
				        			<select name="style" id="style" className="selectBox">
				        				<option value="small">Small</option>
				        				<option value="medium">Medium</option>
				        				<option value="large">Large</option>
				        			</select>
				        		</p>

				        		<Button className="buy-button snipcart-add-item" data-item-id="1" data-item-price="200.00" data-item-url="/" data-item-name="Bluetit"
								 data-item-image={image} data-item-custom1-name="Material" data-item-custom1-options="Canvas|Print"
								 data-item-custom2-name="Size" data-item-custom2-options="Small|Medium[+50.00]|Large">
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