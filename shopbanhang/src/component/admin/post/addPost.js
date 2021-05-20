import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/esm/FormGroup';

export default class AddPost extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            description: "",
            imageFile: null,
            categoryId: "",
            categories: []
        }

    }

    componentDidMount() {
        this.loadCategory()
    }

    setParam = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    setFile = (event) => {
        let file = event.target.files[0]
        if (file != null) {
            this.setState({ imageFile: file })
        }
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
            console.log(result)
            this.setState({ categories: result.data })
        } catch (error) {
            console.log('error', error)
        }
    }

    addPost = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));


        var formdata = new FormData();
        formdata.append("title", this.state.title);
        formdata.append("description", this.state.description);
        formdata.append("categoryId", this.state.categoryId);
        formdata.append("imageFile", this.state.imageFile, this.state.imageFile.name);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        try {
            let response = await fetch("https://learn-api.jmaster.io:8443/api/member/post/add", requestOptions)
            if (response.ok) {
                let result = await response.json();
                alert("Thanh Cong!")
                window.location.reload()
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return <div>
            <br />
            <Form>
                <Form.Label>Add User</Form.Label>
                <div className={FormGroup}>
                    <Form.Group >
                        <Form.Label>Title:</Form.Label>
                        <Form.Control type="text" id="title" name="title" value={this.state.title} onChange={this.setParam} placeholder="Nhap Title" />
                    </Form.Group>
                </div>

                <div className={FormGroup}>
                    <Form.Group >
                        <Form.Label>Description:</Form.Label>
                        <Form.Control type="text" id="description" name="description" value={this.state.description} onChange={this.setParam} placeholder="Nhap Description" />
                    </Form.Group>
                </div>

                <div className="mb-3">
                    <Form.File id="formcheck-api-regular">
                        <Form.File.Label>Image File</Form.File.Label>
                        <Form.File.Input onChange={this.setFile} />
                    </Form.File>
                </div>
                <div>
                    <Form.Group>
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control as="select"  name="categoryId" value={this.state.categoryId} onChange={this.setParam} custom>
                            {this.state.categories.map((category) => {
                                return <option key={category.id} value={category.id}>{category.name}</option>
                            })}
                        </Form.Control>
                    </Form.Group>
                </div>
                <div className={FormGroup}>
                    <Button variant="primary" type="button" onClick={this.addPost}>Add Post</Button>
                </div>
            </Form>
        </div>
    }

}
