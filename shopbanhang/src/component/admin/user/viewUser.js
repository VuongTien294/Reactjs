import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import { withRouter } from 'react-router-dom';

 class ViewUser extends React.Component {
    constructor(props) {
        super(props)
        let {match} = this.props
        let {id} = match.params
        
        this.state = {
            id: id,
            name: "",
            phone: "",
            address: "",
            roles:"",
            enabled:"",
            createdDate:"",
            createdBy:""
        }
    }

    componentDidMount() {
        if (this.state.id) {
            this.loadUser()
        }
    }

    loadUser = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        try {
            let response = await fetch("https://learn-api.jmaster.io:8443/api/admin/user/" + this.state.id, requestOptions)
            let result = await response.json()
            this.setState({ ...result })
        } catch (error) {
            console.log(error)
        }
    }


    render() {
        return <div>
            <br />
             <label>View User</label>
             <p>Id : {this.state.id}</p>
             <p>Name : {this.state.name}</p>
             <p>Phone : {this.state.phone}</p>
             <p>Address : {this.state.address}</p>
             <p>Role : {this.state.roles}</p>
             <p>Enable : {this.state.enabled}</p>
             <p>Created Date : {this.state.createdDate}</p>
             <p> Created by : {this.state.createdBy}</p>
        </div>
    }

}

export default withRouter(ViewUser)