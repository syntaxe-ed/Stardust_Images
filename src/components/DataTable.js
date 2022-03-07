import Axios from "axios";
import { Component } from "react";
import React from "react";
import { Table } from "react-bootstrap";
import UploadStyle from "../css/Upload.css"

class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: [], category: props.category, rows: [], headers: []}
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
        for (const row of this.state.value) {
            rowsToPush.push(
            <tr key={row._id}>
                <td><input className="tableInput" defaultValue="Image"></input></td>
                <td><input className="tableInput" defaultValue={row.galleryTitle}></input></td>
                <td><input className="tableInput" defaultValue={row.fileName}></input></td>
                <td><input className="tableInput" defaultValue={row.keywords}></input></td>
            </tr>
            )
        }

        this.setState({
            rows: rowsToPush
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

        let rowsToPush = [];
        for (const row of this.state.value) {
            rowsToPush.push(
            <tr key={row._id}>
                <td>{row.title}</td>
                <td>{row.parentPage}</td>
            </tr>
            )
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
                        {this.state.rows}
                    </tbody>
                </Table>
            </div>
        );
    };
}

export default DataTable;