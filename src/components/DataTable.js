import Axios from "axios";
import { Component } from "react";
import React from "react";
import { Pagination, Table } from "react-bootstrap";
import UploadStyle from "../css/Upload.css"

class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: [], category: props.category, rows: [], headers: [], pages: [], currentPage: 1, initialValue: [], itemsPerPage: 10 }
        this.handleChange = this.handleChange.bind(this);
        this.getImages = this.getImages.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    async getImageRows() {
        let rowsToPush = [];

        for (let i = 0; i < (this.state.value.length / this.state.itemsPerPage); i++) {
            rowsToPush.push([])
        }

        for (let j = 0; j < this.state.value.length; j++) {
            const row = this.state.value[j];
            rowsToPush[~~(j / this.state.itemsPerPage)].push(
                <tr key={row._id}>
                    <td><input id={`${row._id}_image`} className="tableInput" defaultValue="Image"></input></td>
                    <td><input onChange={(e) => { this.handleChange(e, j, 'galleryTitle') }} id={`${row._id}_galleryTitle`} className="tableInput" value={this.state.value[j].galleryTitle}></input></td>
                    <td><input onChange={(e) => { this.handleChange(e, j, 'fileName') }} id={`${row._id}_fileName`} className="tableInput" value={this.state.value[j].fileName}></input></td>
                    <td><input onChange={(e) => { this.handleChange(e, j, 'keywords') }} id={`${row._id}_keywords`} className="tableInput" value={this.state.value[j].keywords}></input></td>
                </tr>
            )
        }

        this.setState({
            rows: rowsToPush
        })

        return rowsToPush
    }

    async getPagesRows() {


        let rowsToPush = []

        for (let i = 0; i < (this.state.value.length / this.state.itemsPerPage); i++) {
            rowsToPush.push([])
        }

        for (let j = 0; j < this.state.value.length; j++) {
            const row = this.state.value[j];
            rowsToPush[~~(j / this.state.itemsPerPage)].push(
                <tr key={row._id}>
                    <td><input onChange={(e) => { this.handleChange(e, j, 'title') }} id={`${row._id}_title`} className="tableInput" value={this.state.value[j].title}></input></td>
                    <td><input onChange={(e) => { this.handleChange(e, j, 'parentPage') }} id={`${row._id}_parentPage`} className="tableInput" value={this.state.value[j].parentPage}></input></td>
                </tr>
            )
        }

        this.setState({
            rows: rowsToPush
        })

        return rowsToPush
    }

    async getProductsRows() {
        let rowsToPush = [];

        for (let i = 0; i < (this.state.value.length / this.state.itemsPerPage); i++) {
            rowsToPush.push([])
        }

        for (let j = 0; j < this.state.value.length; j++) {
            const row = this.state.value[j];
            rowsToPush[~~(j / this.state.itemsPerPage)].push(
                <tr key={row._id}>
                    <td><input id={`${row._id}_image`} className="tableInput" defaultValue="Image"></input></td>
                    <td><input onChange={(e) => { this.handleChange(e, j, 'fileName') }} id={`${row._id}_fileName`} className="tableInput" value={this.state.value[j].fileName}></input></td>
                    <td><input onChange={(e) => { this.handleChange(e, j, 'productName') }} id={`${row._id}_productName`} className="tableInput" value={this.state.value[j].productName}></input></td>
                    <td><input onChange={(e) => { this.handleChange(e, j, 'price') }} id={`${row._id}_price`} className="tableInput" value={this.state.value[j].price}></input></td>
                    <td><input onChange={(e) => { this.handleChange(e, j, 'category') }} id={`${row._id}_category`} className="tableInput" value={this.state.value[j].category}></input></td>
                </tr>
            )
        }

        this.setState({
            rows: rowsToPush
        })

        return rowsToPush
    }


    setCurrentPage(i) {
        this.setState({
            currentPage: i
        })
    }

    async handleChange(e, j, text) {
        let items = [...this.state.value];
        let item = { ...items[j] };
        item[`${text}`] = e.target.value;
        items[j] = item;
        await this.setState({
            value: items
        })


        if (this.state.category === "images") {
            this.getImageRows();
        }

        if (this.state.category === "pages") {
            this.getPagesRows();
        }

        if (this.state.category === "products") {
            this.getProductsRows();
        }
    }

    async getImages() {
        await Axios.get(`${process.env.REACT_APP_IP_ADDRESS}/gallery`)
            .then(response => {
                this.setState({
                    value: response.data
                })

                this.setState({
                    initialValue: response.data
                })
            })
            .catch((error) => {
                console.log(error)
            })

        this.setState({
            headers:
                <tr>
                    <th>Image Preview</th>
                    <th>Gallery Title</th>
                    <th>Image Name</th>
                    <th>Keywords</th>
                </tr>
        })

        this.getImageRows()

        let pagesToDisplay = [];
        for (let i = 1; i < (this.state.value.length / this.state.itemsPerPage) + 1; i++) {
            pagesToDisplay.push(<Pagination.Item onClick={(event) => this.setCurrentPage(i)} key={i}>{i}</Pagination.Item>)
        }

        this.setState({
            pages: pagesToDisplay
        })

        this.setState({
            initialValues: this.state.value
        })
    }

    async getPages() {
        await Axios.get(`${process.env.REACT_APP_IP_ADDRESS}/pages`)
            .then(response => {
                this.setState({
                    value: response.data
                })

                this.setState({
                    initialValue: response.data
                })
            })
            .catch((error) => {
                console.log(error)
            })

        this.getPagesRows();

        let pagesToDisplay = [];
        for (let i = 1; i < (this.state.value.length / this.state.itemsPerPage) + 1; i++) {
            pagesToDisplay.push(<Pagination.Item onClick={this.setCurrentPage(i)} key={i}>{i}</Pagination.Item>)
        }

        this.setState({
            headers:
                <tr>
                    <th>Page Title</th>
                    <th>Parent Page</th>
                </tr>
        })

        this.setState({
            pages: pagesToDisplay
        })

        this.setState({
            initialValues: this.state.value
        })
    }

    async getProducts() {
        await Axios.get(`${process.env.REACT_APP_IP_ADDRESS}/products`)
            .then(response => {
                this.setState({
                    value: response.data
                })

                this.setState({
                    initialValue: response.data
                })
            })
            .catch((error) => {
                console.log(error)
            })

        
        this.getProductsRows();

        let pagesToDisplay = [];
        for (let i = 1; i < (this.state.value.length / this.state.itemsPerPage) + 1; i++) {
            pagesToDisplay.push(<Pagination.Item onClick={this.setCurrentPage(i)} key={i}>{i}</Pagination.Item>)
        }

        this.setState({
            headers:
                <tr>
                    <th>Image</th>
                    <th>File Name</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Category</th>
                </tr>
        })

        this.setState({
            pages: pagesToDisplay
        })

        this.setState({
            initialValues: this.state.value
        })
    }

    async componentDidMount() {
        if (this.state.category === "images") {
            await this.getImages();
        }

        if (this.state.category === "pages") {
            await this.getPages();
        }

        if (this.state.category === "products") {
            await this.getProducts();
        }
    }

    async handleSave() {
        let countChanges = [];
        for (let i = 0; i < this.state.value.length; i++) {
            if (this.state.value[i] !== this.state.initialValue[i]) {
                countChanges.push(this.state.value[i]);
            }
        }

        if (countChanges.length > 0) {
            if (window.confirm(`Save changes? You have changed ${countChanges.length} items`)) {
                for (const changedValue of countChanges) {
                    await Axios.post(`${process.env.REACT_APP_IP_ADDRESS}/${this.state.category === "images" ? "gallery" : this.state.category}/${changedValue._id}/update`, changedValue);
                }
            }
        }
    }

    render() {
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        {this.state.headers}
                    </thead>
                    <tbody>
                        {this.state.rows[this.state.currentPage - 1]}
                    </tbody>
                </Table>
                <Pagination>{this.state.pages}</Pagination>
                <button onClick={this.handleSave} className="rounded-pill saveButton">Save</button>
            </div>
        );
    };
}

export default DataTable;