import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormGroup from 'react-bootstrap/FormGroup'
import UpdatePost from './updatePost'
import ViewPost from './viewPost'
import { Link } from 'react-router-dom';


export default class ListPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            response: {//Response : Tra ve
                "recordsTotal": 0, //Tong so ban ghi co trong server
                "recordsFiltered": 0,//Tong so ban ghi tim duoc
                "data": [ // mang doi tuong chua doi tuong danh muc duoc tim thay
                ]
            },
            request: { "start": 0, "length": 100, "categoryId": "" },
            hasMore: true

        }
    }

    setParam = (event) => {
        // this.setState({ [event.target.name]: event.target.value })

        this.setState({
            request: { "start": 0, "length": 100, [event.target.name]: event.target.value }

        })
        console.log(this.state.request)
    }

    setSelectedId = (id) => {
        this.setState({ selectedId: id })
    }

    reset = () => {
        let request = this.state.request
        request.categoryId = this.state.request.categoryId
        this.setState({
            request, response: {
                "recordsTotal": 0,
                "recordsFiltered": 0,
                "data": [
                ]
            }
        }, this.loadPost)
    }

    loadPost = async () => {
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
            let response = await fetch("https://learn-api.jmaster.io:8443/api/post/search", requestOptions)
            let result = await response.json()
            if (response.ok) {
                this.setState({ response: result })
            }
        } catch (error) {
            console.log(error)

        }
    }

    delete = async (id) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+localStorage.getItem("accessToken"));


        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };
        try {
            let response = await fetch("https://learn-api.jmaster.io:8443/api/admin/post/delete?id="+id, requestOptions)
            if(response.ok){
                alert("Xoa thanh cong!")
                this.reset()

                
            }
        } catch (error) {
                console.log(error)
        }

    }

    render() {
        return <div>
            <GetCategoryPost setParam={this.setParam} getPost={this.loadPost} /><br />
            <TablePost dataProperties={this.state.response.data} deleteProperties={this.delete} id={this.setSelectedId} setSelectedIdProperties={this.setSelectedId}/><br/>
        </div>
    }

}


class GetCategoryPost extends Component {
    constructor(props) {
        super(props)
        this.state = {

            categories: []
        }

    }

    componentDidMount() {
        this.loadCategory()
    }

    loadCategory = async () => {
        const search = { "start": 0, "length": 200, "search": { "value": "" } }
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(search);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try {
            let response = await fetch("https://learn-api.jmaster.io:8443/api/category/search", requestOptions)
            let result = await response.json()
            this.setState({ categories: result.data })
        } catch (error) {
            console.log('error', error)
        }
    }

    render() {
        return <div>
            <label>Search Form</label>
            <form>
                <div>
                    <Form.Group>
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control as="select" name="categoryId" onChange={this.props.setParam} custom>
                            {this.state.categories.map((category) => {
                                return <option key={category.id} value={category.id}>{category.name}</option>
                            })}
                        </Form.Control>
                    </Form.Group>
                </div>
                <div className={FormGroup}>
                    <Button variant="primary" type="button" onClick={this.props.getPost}>Load Post</Button>
                </div>
            </form>
        </div>
    }

}

class TablePost extends Component {
    render() {
        return <div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Images</th>
                        <th>CategoryId</th>
                        <th>Category Name</th>
                        <th>Create By</th>
                        <th>Create Date</th>
                        <th>About</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.dataProperties.map(item => {
                        return <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>
                                <img src={"https://learn-api.jmaster.io:8443/image/" + item.images} width={"100"} />
                            </td>
                            <td>{item.categoryId}</td>
                            <td>{item.categoryName}</td>
                            <td>{item.createdBy}</td>
                            <td>{item.createdDate}</td>
                            <td>
                                <Button><Link to={"/admin/post/update/" + item.id}>Edit</Link></Button>                 
                                <Button  onClick={()=>{this.props.deleteProperties(item.id)}} >Delete</Button>
                                <Button><Link to={"/admin/post/view/" + item.id}>View</Link></Button>
                            </td>
                        </tr>
                    })}

                </tbody>
            </Table>
        </div>
    }

}