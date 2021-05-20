import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
// import Login from './login/Login'
import AddUser from './addUser'
import UpdateUser from './updateUser'
import ViewUser from './viewUser'
import { Link } from 'react-router-dom';

export default class ListUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            response: {//Response : Tra ve
                "recordsTotal": 0, //Tong so ban ghi co trong server
                "recordsFiltered": 0,//Tong so ban ghi tim duoc
                "data": [ // mang doi tuong chua doi tuong danh muc duoc tim thay
                ]
            },
            request: { "start": 0, "length": 2, "search": { "value": "" } },
            hasMore: true
        }
    }

    componentDidMount() {
        this.loadUser()
    }

    search = (event) => {
        let value = event.target.value
        let request = {
            "start": 0, "length": 2, "search": { "value": value }
        }
        this.setState(
            {
                request,
                response: {//Response : Tra ve
                    "recordsTotal": 0, //Tong so ban ghi co trong server
                    "recordsFiltered": 0,//Tong so ban ghi tim duoc
                    "data": [ // mang doi tuong chua doi tuong danh muc duoc tim thay
                    ]
                }
            }, this.loadUser
        )
    }

    loadMore = () => {
        let request = this.state.request
        request.start += request.length
        this.setState({ request }, this.loadUser)
    }

    page = (i) => {
        let request = this.state.request
        request.start = request.length * (i - 1)

        this.setState({
            request, response: {//Set lai State.do bien search o ham search nay trung ten vs bien search o state nen ko can : .   
                "recordsTotal": 0,
                "recordsFiltered": 0,
                "data": [
                ]
            }
        }, this.loadUser)
    }

    setSelectedId = (id) => {
        this.setState({ selectedId: id })
    }

    reset = () => {
        let request = this.state.request
        request.start = 0
        this.setState({
            request, response: {
                "recordsTotal": 0,
                "recordsFiltered": 0,
                "data": [
                ]
            }
        }, this.loadUser)
    }

    loadUser = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));

        var raw = JSON.stringify(this.state.request);


        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };


        try {
            let response = await fetch("https://learn-api.jmaster.io:8443/api/admin/accounts", requestOptions)
            let result = await response.json()

            let oldResp = this.state.response
            oldResp.data = oldResp.data.concat(result.data)
            oldResp.recordsFiltered = result.recordsFiltered

            this.setState({ response: oldResp, hasMore: result.data.length == this.state.request.length })

            // this.setState({ response: result })
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
            let response = await fetch("https://learn-api.jmaster.io:8443/api/admin/user/delete?id="+id, requestOptions)
            if(response.ok){
                this.reset()
                return
            }         
        } catch (error) {
            console.log(error)
        }


    }

    render() {
        let paging = []//tao mang
        //duyet mang luc dau trang se la 1.Neu trang hien tai ma <= (so ban ghi tim duoc)/(so ban ghi can lay)
        //Vi du so ban ghi tim duoc la 8 ma so ban ghi can lay la 2 thi giao dien se show ra 4 trang
        for (let i = 1; i <= Math.ceil(this.state.response.recordsFiltered / this.state.request.length); i++) {
            paging.push(<Button variant="primary" type="button" key={i} onClick={() => this.page(i)}>{i}</Button>)
        }

        return <div>
            {/* <Login /> */}
            <SearchFormUser searchProperties={this.search} /><br />
            {this.state.response.data && <TableUser dataProperties={this.state.response.data} setSelectedIdProperties={this.setSelectedId} deleteId={this.delete} />}

            {/*<TableUser dataProperties={this.state.response.data} /> */}

            {/* nut load them */}
            {this.state.hasMore && <Button variant="primary" onClick={this.loadMore}>Load More</Button>}
            {paging}<br/>

            {/* <ViewUser id={this.state.selectedId} key={this.state.selectedId}/>

            <UpdateUser id={this.state.selectedId} key={"update-"+this.state.selectedId}/><br/>

            <AddUser  /> */}

        </div>
    }

}
class SearchFormUser extends Component {
    render() {
        return <div>
            <label>Search Form</label>
            <form>
                <input type="text" onChange={this.props.searchProperties} />
            </form>
        </div>
    }

}

class TableUser extends Component {
    render() {
        return <div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Enabled</th>
                        <th>Created Date</th>
                        <th>Role</th>
                        <th>About</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.dataProperties.map(item => {
                        return <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.phone}</td>
                            <td>{item.address}</td>
                            <td>{item.enabled}</td>
                            <td>{item.createdDate}</td>
                            <td>{item.roles}</td>
                            <td>
                                <Button><Link  to={"/admin/user/update/" + item.id}>Edit</Link></Button>
                                <Button><Link  to={"/admin/user/view/" + item.id}>View</Link></Button>
                                <Button onClick={() => { this.props.deleteId(item.id) }}>Delete</Button>
                            </td>
                        </tr>
                    })}

                </tbody>
            </Table>
        </div>
    }

}