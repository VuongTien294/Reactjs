import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'
import 'bootstrap/dist/css/bootstrap.min.css';
// import Login from './login/Login'



export default class ListComment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            response: {//Response : Tra ve
                "recordsTotal": 0, //Tong so ban ghi co trong server
                "recordsFiltered": 0,//Tong so ban ghi tim duoc
                "data": [ // mang doi tuong chua doi tuong danh muc duoc tim thay
                ]
            },
            request: { "start": 0, "length": 2, "postId": 0 },//Request: Yeu cau.0 la vi tri dau tien.lenght la so ban ghi can lay
            hasMore: true,
        }
    }

    setParam = (event) => {
        this.setState({

            request: { "start": 0, "length": 100, [event.target.name]: event.target.value }

        })
        console.log(this.state.request)
    }

    loadComment = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


        var raw = JSON.stringify(
            this.state.request
        );

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try {
            let response = await fetch("https://learn-api.jmaster.io:8443/api/comment/search", requestOptions)
            if (response.ok) {
                let result = await response.json()
                this.setState({ response: result })
            }
        } catch (error) {
            console.log(error)
        }

    }

    reset = () => {
        let request = this.state.request
        request.postId = this.state.request.postId
        this.setState({
            request, response: {
                "recordsTotal": 0,
                "recordsFiltered": 0,
                "data": [
                ]
            }
        }, this.loadComment)
    }

    delete = async (id) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
        var raw = "";

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try {
            let response = await fetch("https://learn-api.jmaster.io:8443/api/admin/comment/delete?id=" + id, requestOptions)
            if(response.ok){
                alert("Xoa thanh cong!")
             this.reset()
            }
        } catch (error) {

        }

    }


    render() {
        return <div>
            <GetPostId setParam={this.setParam} getComment={this.loadComment} />
            <TableComment dataProperties={this.state.response.data} deleteProperties={this.delete} />

        </div>
    }
}

class GetPostId extends Component {
    render() {
        return <div>
            <Form inline>
                <FormControl type="text" placeholder="Search" name="postId" className="mr-sm-2" onChange={this.props.setParam} />
                <div>
                    <Button variant="primary" type="button" onClick={this.props.getComment}>Load Post</Button>
                </div>
            </Form>
        </div>
    }

}

class TableComment extends Component {
    render() {
        return <div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Content</th>
                        <th>User Id</th>
                        <th>Created Date</th>
                        <th>Post Id</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.dataProperties.map(item => {
                        return <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.content}</td>
                            <td>{item.userId}</td>
                            <td>{item.createdDate}</td>
                            <td>{item.postId}</td>
                            <td>
                                <Button variant="primary" type="button" onClick={() => { this.props.deleteProperties(item.id) }}>Delete</Button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </Table>
        </div>
    }

}





