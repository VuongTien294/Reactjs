import Button from 'react-bootstrap/Button';
import React from 'react';
import Form from 'react-bootstrap/Form'
import FormGroup from 'react-bootstrap/FormGroup'
import { withRouter } from 'react-router-dom';


 class UpdateCategory extends React.Component {
    constructor(props) {
        super(props)
        
        let { match } = this.props
        let { id } = match.params

        console.log(id)

        this.state = {
            "id": id,
            "name" :""
        }
    }

    componentDidMount(){
        if(this.state.id){
            this.loadCategory()
        }
        
    }

    setParams=(event)=>{
        this.setState({[event.target.name] : event.target.value})
    }


    loadCategory = async () => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        try {
            let response = await fetch("https://learn-api.jmaster.io:8443/api/category/" + this.state.id, requestOptions)
            let result = await response.json()
            this.setState({ ...result })//set lai State.   ...result nghia la lay tat ca cac gia tri cua result bao gom id va name
        } catch (error) {
            console.log('error', error)
        }
    }

    updateCategory = async ()=>{
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(this.state);

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://learn-api.jmaster.io:8443/api/admin/category/update", requestOptions)
            .then(response => {
                if (response.ok) {
                    let {history} = this.props
                    history.goBack()
                    return;
                }
                throw new Error(response.status)
            })
            .then(result => {
                alert("Update thanh cong")

            })
            .catch(error => {
                console.log('error', error)
                alert("Danh muc da ton tai")
            });
    }

    render(){
        return <div>
            <Form>
                <div className={FormGroup}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type="text" name="name" value={this.state.name} onChange={this.setParams} placeholder="Nhap Name" />
                    </Form.Group>
                </div>
                <div className={FormGroup}>
                    <Button variant="primary" onClick={this.updateCategory} type="button">Update Category</Button>
                </div>
            </Form>

        </div>
    }
}

export default withRouter(UpdateCategory)