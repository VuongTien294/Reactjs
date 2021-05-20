import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import { withRouter } from 'react-router-dom';

 class ViewPost extends React.Component {
    constructor(props) {
        super(props)
        
        let { match } = this.props
        let { id } = match.params

        this.state = {
            id: id,
            title: "",
            description: "",
            images: null,
            categoryId: ""
        }

    }

    componentDidMount() {
        if (this.state.id) {
            this.getPost()
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
                images :result.images
            })

        } catch (error) {
            console.log(error)
        }

    }

    render() {
        return <div>
            <label>View Post</label>
            <br />
             <p>Id : {this.state.id}</p>
             <p>Title : {this.state.title}</p>
             <p>Description : {this.state.description}</p>
             <p>Image</p>
             {this.state.id && <img src={"https://learn-api.jmaster.io:8443/image/" + this.state.images} width={"100"}/>}     
             <p>Category Id : {this.state.categoryId}</p>
        </div>
    }

}

export default withRouter(ViewPost)
