import Axios from "axios";
import { Component } from "react";
import React from "react";
import { Pagination, Table } from "react-bootstrap";
import UploadStyle from "../css/Upload.css"

class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: [], category: props.category, rows: [], headers: [], pages: [], currentPage: 1, initialValue: []}
        this.handleChange = this.handleChange.bind(this);
        this.getImages = this.getImages.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    async getRows() {
        let rowsToPush = [];

        for (let i = 0; i < (this.state.value.length / 10); i++){
            rowsToPush.push([])
        }

        for (let j = 0; j < this.state.value.length; j++){
            const row = this.state.value[j];
            rowsToPush[~~(j / 10)].push(
                <tr key={row._id}>
                <td><input id={`${row._id}_image`} className="tableInput" defaultValue="Image"></input></td>
                <td><input onChange={(e) => {this.handleChange(e, j, 'galleryTitle')}} id={`${row._id}_galleryTitle`} className="tableInput" value={this.state.value[j].galleryTitle}></input></td>
                <td><input onChange={(e) => {this.handleChange(e, j, 'fileName')}} id={`${row._id}_fileName`} className="tableInput" value={this.state.value[j].fileName}></input></td>
                <td><input onChange={(e) => {this.handleChange(e, j, 'keywords')}} id={`${row._id}_keywords`} className="tableInput" value={this.state.value[j].keywords}></input></td>
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
        let item = {...items[j]};
        item[`${text}`] = e.target.value;
        items[j] = item;
        await this.setState({
            value: items
        })
        this.getRows()
        // this.props.updatedValues(this.state.value)
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

        const rowsToPush = this.getRows()

        let pagesToDisplay = [];
        for (let i = 1; i < (this.state.value.length / 10) + 1; i++){
            pagesToDisplay.push(<Pagination.Item onClick={(event) => this.setCurrentPage(i)} key={i}>{i}</Pagination.Item>)
        }

        this.setState({
            pages: pagesToDisplay
        })

        this.setState({
            initialValues: this.state.value
        })
    }

    async getPages(){
        await Axios.get(`${process.env.REACT_APP_IP_ADDRESS}/pages`)
                .then(response => {
                    this.setState({
                        value: response.data
                    })
                })
                .catch((error) => {
                    console.log(error)
            })

        let rowsToPush = []

        for (let i = 0; i < (this.state.value.length / 10); i++){
            rowsToPush.push([])
        }

        for (let j = 0; j < this.state.value.length; j++){
            const row = this.state.value[j];
            rowsToPush[~~(j / 10)].push(
                <tr key={row._id}>
                <td>{row.title}</td>
                <td>{row.parentPage}</td>
            </tr>
            )
        }

        let pagesToDisplay = [];
        for (let i = 1; i < this.state.value.length / 10 +1; i++){
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
            rows: rowsToPush
        })

        this.setState({
            pages: pagesToDisplay
        })
    }

    async componentDidMount() {
        if (this.state.category === "images") {
           await this.getImages();
        }

        if (this.state.category === "pages") {
            await this.getPages();
        }
    }    

    async handleSave(){
        let countChanges = [];
        for (let i = 0; i < this.state.value.length; i++) {
            if (this.state.value[i] !== this.state.initialValue[i]) {
                console.log(this.state.value[i])
                countChanges.push(this.state.value[i]);
            }
        }
        
        if (countChanges.length > 0){
            if (window.confirm(`Save changes? You have changed ${countChanges.length} items`)){
                for (const changedValue of countChanges){
                    await Axios.post(`${process.env.REACT_APP_IP_ADDRESS}/pages/${changedValue._id}/update`, changedValue);
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