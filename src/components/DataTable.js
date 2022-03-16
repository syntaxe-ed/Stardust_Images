import Axios from "axios";
import { Component } from "react";
import React from "react";
import { Pagination, Table } from "react-bootstrap";
import UploadStyle from "../css/Upload.css"

class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: [], category: props.category, rows: [], headers: [], pages: [], currentPage: 1}
    }

    setCurrentPage(i) {
        this.setState({
            currentPage: i
        })
    }

    async getImages() {
        await Axios.get(`${process.env.REACT_APP_IP_ADDRESS}/gallery`)
            .then(response => {
                this.setState({
                    value: response.data
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

        let rowsToPush = [];

        for (let i = 0; i < (this.state.value.length / 10); i++){
            rowsToPush.push([])
        }

        for (let j = 0; j < this.state.value.length; j++){
            const row = this.state.value[j];
            rowsToPush[~~(j / 10)].push(
                <tr key={row._id}>
                <td><input id={`${row._id}_image`} className="tableInput" defaultValue="Image"></input></td>
                <td><input id={`${row._id}_galleryTitle`} className="tableInput" defaultValue={row.galleryTitle}></input></td>
                <td><input id={`${row._id}_fileName`} className="tableInput" defaultValue={row.fileName}></input></td>
                <td><input id={`${row._id}_keywords`} className="tableInput" defaultValue={row.keywords}></input></td>
            </tr>
            )
        }

        let pagesToDisplay = [];
        for (let i = 1; i < (this.state.value.length / 10) + 1; i++){
            pagesToDisplay.push(<Pagination.Item onClick={(event) => this.setCurrentPage(i)} key={i}>{i}</Pagination.Item>)
        }

        this.setState({
            rows: rowsToPush
        })

        this.setState({
            pages: pagesToDisplay
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
            </div>
        );
    };
}

export default DataTable;