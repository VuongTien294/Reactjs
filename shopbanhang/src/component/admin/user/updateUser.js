import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import { withRouter } from 'react-router-dom';


 class UpdateUser extends React.Component {
    constructor(props) {
        super(props)

        let { match } = this.props
        let { id } = match.params

        this.state = {
            id: id,
            name: "",
            phone: "",
            address: ""
        }
    }

    componentDidMount() {
        if (this.state.id) {
            this.loadUser()
        }
    }

    setParam = (event) => {
        this.setState({ [event.target.name]: event.target.value })
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

    updateUser = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+localStorage.getItem("accessToken"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id": this.state.id,
            "name": this.state.name,
            "phone": this.state.phone,
            "address": this.state.address
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        try {
            let response= await fetch("https://learn-api.jmaster.io:8443/api/admin/user/update", requestOptions)
            if(response.ok){
               alert("Update Thanh Cong!")
               let {history} = this.props
               history.goBack()
               return
               
            }
        } catch (error) {
            
        }


    }

    render() {
        return <div>
            <br />
            <Form>
                <Form.Label>Update User</Form.Label>
                <div className={FormGroup}>
                    <Form.Group >
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type="text" id="name" name="name" value={this.state.name} onChange={this.setParam} placeholder="Nhap Name" />
                    </Form.Group>
                </div>

                <div className={FormGroup}>
                    <Form.Group >
                        <Form.Label>Phone:</Form.Label>
                        <Form.Control type="number" id="phone" name="phone" value={this.state.phone} onChange={this.setParam} placeholder="Nhap Phone" />
                    </Form.Group>
                </div>

                <div className={FormGroup}>
                    <Form.Group >
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" name="address" id="address" value={this.state.address} onChange={this.setParam} placeholder="Nhap Address" />
                    </Form.Group>
                </div>

                <div className={FormGroup}>
                    <Button variant="primary" type="button" onClick={this.updateUser}>Update</Button>
                </div>
            </Form>
        </div>
    }

}
export default withRouter(UpdateUser)