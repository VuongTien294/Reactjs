import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormGroup from 'react-bootstrap/FormGroup'


export default class AddCategory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
         "name":""
        }
    }

    setParams=(event)=>{
        this.setState({[event.target.name] : event.target.value})
    }

    addCategory=()=>{
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(this.state);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://learn-api.jmaster.io:8443/api/admin/category/add", requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error(response.status)
            })
            .then(result => {
                console.log(result)
                alert("Them Category thanh cong!")
                window.location.reload()
            })
            .catch(error => {
                console.log('error', error)
                alert("Danh muc da ton tai")
            });
    }

    render(){
        return <div>
            <Form>
                <div className={FormGroup}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type="text" name="name" value={this.state.name} onChange={this.setParams} placeholder="Nhap Name" />
                    </Form.Group>
                </div>
                <div className={FormGroup}>
                    <Button variant="primary" onClick={this.addCategory} type="button">Add Category</Button>
                </div>
            </Form>

        </div>
    }




}