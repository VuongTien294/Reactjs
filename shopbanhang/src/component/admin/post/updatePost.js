import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import { withRouter } from 'react-router-dom';

 class UpdatePost extends React.Component {
    constructor(props) {
        super(props)

        let { match } = this.props
        let { id } = match.params

        this.state = {
            id: id,
            title: "",
            description: "",
            imageFile: null,
            categoryId: ""
        }

    }

    componentDidMount() {
        if (this.state.id) {
            this.getPost()
        }

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


    getPost = async () => {
        var myHeaders = new Headers();


        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        try {
            let response = await fetch("https://learn-api.jmaster.io:8443/api/post/" + this.state.id, requestOptions)
            let result = await response.json()
            console.log(result)
            this.setState({
                title: result.title,
                description: result.description,
                categoryId: result.categoryId,
                imageFile : result.images
            })

        } catch (error) {
            console.log(error)
        }

    }

    updatePost = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));


        var formdata = new FormData();
        formdata.append("id", this.state.id);
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
            let response = await fetch("https://learn-api.jmaster.io:8443/api/admin/post/update", requestOptions)
            if (response.ok) {
                alert("Update Thanh Cong!")
                let {history} = this.props
                history.goBack()
            }
        } catch (error) {
            console.log(error)
        }


    }

    render() {
        return <div>
            <br />
            <Form>
                <Form.Label>Update User</Form.Label>
                <div className={FormGroup}>
                    <Form.Group >
                        <Form.Label>Id:</Form.Label>
                        <Form.Control type="text" id="id" name="id" value={this.state.id} onChange={this.setParam} readOnly />
                    </Form.Group>
                </div>

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
                    
                        <Form.Label>Old Image : </Form.Label>
                        {this.state.id && <img src={"https://learn-api.jmaster.io:8443/image/" + this.state.imageFile} width={"100"}/>}  
                    
                </div>

                <div className="mb-3">
                    <Form.File id="formcheck-api-regular">
                        <Form.File.Label>Image File</Form.File.Label><br/>
                        <Form.File.Input onChange={this.setFile} />
                    </Form.File>
                </div>
                <div className={FormGroup}>
                    <Form.Group >
                        <Form.Label>Category Id:</Form.Label>
                        <Form.Control type="text" id="categoryId" name="categoryId" value={this.state.categoryId} onChange={this.setParam} placeholder="Nhap Cate Id" />
                    </Form.Group>
                </div>
                <div className={FormGroup}>
                    <Button variant="primary" type="button" onClick={this.updatePost}>Update Post</Button>
                </div>
            </Form>
        </div>
    }

}

export default withRouter(UpdatePost)
