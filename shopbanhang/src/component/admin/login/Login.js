import React from 'react';
import Profile from './Profile'
import FormGroup from 'react-bootstrap/esm/FormGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            "username": "",
            "password": "",
            isLogin: localStorage.getItem("accessToken") != null // isLogin = true khi co token trong trinh duyet neu ko thi la null
        }
    }

    setParams = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    login = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("username", this.state.username);
        urlencoded.append("password", this.state.password);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://learn-api.jmaster.io:8443/api/login", requestOptions)
            .then(response => {
                console.log(response)
                if (response.ok) {
                    return response.json()
                }

                throw new Error(response.status)
            })
            .then(result => {
                console.log(result)
                localStorage.setItem("accessToken", result.accessToken) //set token vao trinh duyet
                this.setState({ isLogin: true }) // neu tra ve thanh cong thi set trang thai cua isLogin la true
            })
            .catch(error => {
                console.log('error', error)
                alert("Username or password wrong!")
            });
    }

    onLogoutSuccess = () => {
        this.setState({ isLogin: false }) //set trang thai cua isLogin la false de logout khoi trinh duyet
    }

    render() {
        return <div>
            {this.state.isLogin ?
                <Profile key={this.state.isLogin} onLogoutSuccessProperties={this.onLogoutSuccess} /> :
                <Form>
                    <div className={FormGroup}>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type="text" placeholder="nhap username" name="username" onChange={this.setParams} />
                        </Form.Group>
                    </div>
                    <div className={FormGroup}>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" placeholder="nhap password" name="password" onChange={this.setParams} />
                        </Form.Group>
                    </div>
                    <div className={FormGroup}>
                        <Button variant="primary" type="button" onClick={this.login}>Login</Button>
                    </div>
                </Form>
            }
        </div>
    }
}
