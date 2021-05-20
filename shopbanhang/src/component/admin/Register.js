import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormGroup from 'react-bootstrap/esm/FormGroup';

export default class RegisterForm extends React.Component {
    render() {
        return <div>
            <Form>
                <div className={FormGroup}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type="text" placeholder="Nhap Name" />
                    </Form.Group>
                </div>
                <div className={FormGroup}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="password" placeholder="Nhap Username" />
                    </Form.Group>
                </div>

                <div className={FormGroup}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder="Nhap Password" />
                    </Form.Group>
                </div>

                <div>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>City</Form.Label>
                        <Form.Control as="select" custom>
                            <option>Ha Noi</option>
                            <option>TP.HCM</option>
                        </Form.Control>
                    </Form.Group>
                </div>
                <div>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>About</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="About You" />
                    </Form.Group>
                </div>

                <div className={FormGroup}>
                    <Button variant="primary" type="button">Register</Button>
                </div>
            </Form>
        </div>
    }

}