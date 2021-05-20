import Button from 'react-bootstrap/Button';
import React from 'react';

export default class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            "user": {}
        }
    }

    componentDidMount() {
        this.loadDataProfile()
    }

    loadDataProfile = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken")); //lay token tu trinh duyet

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
                this.setState({ user: result }) //neu co du lieu tra ve thi set lai trang thai cua doi tuong user chinh la ket qua tra ve(cung la 1 doi tuong)
            })
            .catch(error => {
                console.log('error', error)
                this.logout()
            });
    }

    logout = () => {
        localStorage.removeItem("accessToken")//logout thi chi can xoa token tren trinh duyet
        this.props.onLogoutSuccessProperties() //truyen ham onLogoutSuccess qua props de xet lai trang thai isLogin la false
    }

    render() {
        return <div>
            <div>Name: {this.state.user.name}</div>
            <div>Phone: {this.state.user.phone}</div>

            <Button variant="primary" type="button" onClick={this.logout}>Logout</Button>
        </div>
    }

}