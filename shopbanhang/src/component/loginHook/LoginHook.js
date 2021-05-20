import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ProfileHook from './ProfileHook';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function LoginHook() {
    let history = useHistory()
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")

    let setParams = (event) => {
        if (event.target.name === 'username') {
            setUsername(event.target.value)
        }
        if (event.target.name === 'password') {
            setPassword(event.target.value)
        }
    }

    let login = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("username", username);
        urlencoded.append("password", password);

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
                localStorage.setItem("accessToken", result.accessToken)
                history.replace("/admin")
            })
            .catch(error => {
                console.log('error', error)
                alert("Username hoac password sai!")
            });
    }

    return <div>
        <Form>
            <Form.Group >
                <Form.Label>UserName</Form.Label>
                <Form.Control type="text" placeholder="Enter Username" name="username" onChange={setParams} />
            </Form.Group>
            <Form.Group >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" onChange={setParams} />
            </Form.Group>
            <Button variant="primary" type="button" onClick={login}>
                Login
  </Button>
        </Form>

    </div>

}