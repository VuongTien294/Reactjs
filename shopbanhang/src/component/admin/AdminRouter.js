import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import { useHistory } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import AddCategory from "./category/addCategory";
import ListCategory from "./category/listCategory";
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import UpdateCategory from "./category/updateCategory";
import ViewCategory from "./category/viewCategory";
import ListPost from "./post/listPost";
import AddPost from "./post/addPost";
import UpdatePost from "./post/updatePost";
import ViewPost from "./post/viewPost";
import AddUser from "./user/addUser";
import ListUser from "./user/listUser";
import UpdateUser from "./user/updateUser";
import ViewUser from "./user/viewUser";
import ListComment from "./comment/listComment";
import LoginHook from "../loginHook/LoginHook";
import Button from 'react-bootstrap/Button';

export default function AdminRouter() {
    let history = useHistory()

    let logout=()=> {
    localStorage.removeItem("accessToken")
    history.replace("/")
}

    return (
        <Router>
            <div>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand href="#home">ADMIN</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <NavDropdown title="Category" id="basic-nav-dropdown">
                            <NavDropdown.Item ><Link to="/admin/category/add">Add Category</Link></NavDropdown.Item>
                            <NavDropdown.Item ><Link to="/admin/category/search">Search Category</Link></NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Post" id="basic-nav-dropdown">
                            <NavDropdown.Item ><Link to="/admin/post/add">Add Post</Link></NavDropdown.Item>
                            <NavDropdown.Item ><Link to="/admin/post/search">Search Post</Link></NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="User" id="basic-nav-dropdown">
                            <NavDropdown.Item ><Link to="/admin/user/add">Add User</Link></NavDropdown.Item>
                            <NavDropdown.Item ><Link to="/admin/user/search">Search User</Link></NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Comment" id="basic-nav-dropdown">
                            <NavDropdown.Item ><Link to="/admin/comment/search">Search Comment</Link></NavDropdown.Item>
                        </NavDropdown>

                       <Button type="button" variant="primary"  onClick={logout}>Logout</Button>

                    </Nav>
                </Navbar>

                <Switch>
                    <Route exact path="/admin/category/add">
                        <AddCategory />
                    </Route>
                    <Route exact path="/admin/category/search">
                        <ListCategory />
                    </Route>
                    <Route exact path="/admin/category/update/:id">
                        <UpdateCategory />
                    </Route>
                    <Route exact path="/admin/category/view/:id">
                        <ViewCategory />
                    </Route>

                    <Route exact path="/admin/post/add">
                        <AddPost />
                    </Route>
                    <Route exact path="/admin/post/search">
                        <ListPost />
                    </Route>
                    <Route exact path="/admin/post/update/:id">
                        <UpdatePost />
                    </Route>
                    <Route exact path="/admin/post/view/:id">
                        <ViewPost />
                    </Route>

                    <Route exact path="/admin/user/add">
                        <AddUser />
                    </Route>
                    <Route exact path="/admin/user/search">
                        <ListUser />
                    </Route>
                    <Route exact path="/admin/user/update/:id">
                        <UpdateUser />
                    </Route>
                    <Route exact path="/admin/user/view/:id">
                        <ViewUser />
                    </Route>

                    <Route exact path="/admin/comment/search">
                        <ListComment />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}
