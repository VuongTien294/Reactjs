import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

 class ViewCategory extends Component {
    constructor(props) {
        super(props)

        let { match } = this.props
        let { id } = match.params

        this.state = {
            id: id,
            name: ""
        }
    }

    componentDidMount() {
        this.loadCategory()
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

    render() {
        return <div>
            <p>ID: {this.state.id}</p>
            <p>Name: {this.state.name}</p>
        </div>
    }

}

export default withRouter(ViewCategory)