import React, {useState} from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import UploadContainer from '../components/UploadContainer';
import {UploadStyle} from "../css/Upload.css"

function Upload() {
	const [actionValue, setActionValue] = useState("default");
	const [categoryValue, setCategoryValue] = useState("default");

	const handleActionChange = (e) => {
		setActionValue(e.target.value);
		setCategoryValue("default");
	}

	const handleCategoryChange = (e) => {
		setCategoryValue(e.target.value);
	}


	return (
		!localStorage.getItem('accessToken')  ? <Redirect to={{pathname: 'login'}} /> :
		<div className="uploadContainer">
			<Container className="fluidContainer" fluid>
				<Row className="taskbar">
					<Col sm={12} lg={6}>
						<select defaultValue={actionValue} onChange={handleActionChange} className="selectBox rounded-pill">
							<option value="default" disabled hidden>Choose an action</option>
							<option value="add">Add an Item</option>
							<option value="edit">Edit existing items</option>
						</select>
					</Col>
					<Col sm={12} lg={6}>
						<select disabled={actionValue === "default"} defaultValue={categoryValue} onChange={handleCategoryChange} className="selectBox rounded-pill">
							<option value="default" disabled hidden>Choose a category</option>
							<option value="products">Products</option>
							<option value="pages">Pages</option>
							<option value="images">Images</option>
						</select>
					</Col>
				</Row>

				<Row className="rowContainer">
					<Col className="title" sm={12} lg={12}>
						{actionValue === "default" ? <h1 className="title">Choose an action</h1> : ( categoryValue === "default" ? <h1 className="title">Choose a Category</h1> : <UploadContainer />)}
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default Upload