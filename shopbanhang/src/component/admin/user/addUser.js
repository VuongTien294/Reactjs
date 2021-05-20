import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/esm/FormGroup';

export default class AddUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            password: "",
            phone: "",
            address: "",
            roles: ""
        }

    }

    setParam = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    addUser = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
        myHeaders.append("Content-Type", "application/json");


        // var raw = JSON.stringify(this.state);

        var raw = JSON.stringify({
            "name": this.state.name,
            "password": this.state.password,
            "phone": this.state.phone,
            "address": this.state.address,
            "roles": [
                this.state.roles
            ]
        });


        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try {
            let response = await fetch("https://learn-api.jmaster.io:8443/api/admin/user/add", requestOptions)
            if (response.ok) {
                alert("Them thanh cong!")
                console.log(response.json())           
                window.location.reload()
                return
            }


        } catch (error) {
            console.log(error)
        }

    }

    render() {
        return <div>
            <br />
            <Form>
                <Form.Label>Add User</Form.Label>
                <div className={FormGroup}>
                    <Form.Group >
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type="text" id="name" name="name" value={this.state.name} onChange={this.setParam} placeholder="Nhap Name" />
                    </Form.Group>
                </div>

                <div className={FormGroup}>
                    <Form.Group >
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" id="password" name="password" value={this.state.password} onChange={this.setParam} placeholder="Nhap Password" />
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

                <div>
                    <Form.Group >
                        <Form.Label>Role</Form.Label>
                        <Form.Control as="select" name="roles" value={this.state.roles} onChange={this.setParam} custom>
                            <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                            <option value="ROLE_MEMBER">ROLE_MEMBER</option>
                        </Form.Control>
                    </Form.Group>
                </div>

                <div className={FormGroup}>
                    <Button variant="primary" type="button" onClick={this.addUser}>Add User</Button>
                </div>
            </Form>
        </div>
    }

}