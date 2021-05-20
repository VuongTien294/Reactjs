import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


export default function ProfileHook(props) {
    const [user, setUser] = useState({})
    const token = localStorage.getItem("accessToken")
    let history = useHistory()

    useEffect(() => {
        loadDataProfile()
    }, [token])

    let loadDataProfile = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://learn-api.jmaster.io:8443/api/member/me", requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error(response.status)
            })
            .then(result => {
                console.log(result)
                setUser(result)
            })
            .catch(error => {
                console.log('error', error)
                logout()
            });
    }

    let logout = () => {
        localStorage.removeItem("accessToken")
        // props.onLogoutSuccess()
        history.replace("/")
    }

    return <div>
        <div>Name: {user.name}</div>
        <div>Phone: {user.phone}</div>

        <button type="button" onClick={logout}>Logout</button>
    </div>
}