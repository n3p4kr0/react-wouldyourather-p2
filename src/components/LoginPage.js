import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Select, Grid, Header, Image, Button} from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'
import LoadingBar from 'react-redux-loading'
import "./css/LoginPage.css"

class LoginPage extends Component {
    constructor (props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.handleSelectUser = this.handleSelectUser.bind(this)
    }

    handleChange(e) {
        const value = e.target.value
        this.setState( (prevState) => ({ selectedUser: value }))
    }

    handleSelectUser = (e) => {
        if(this.state.selectedUser === '') {
            // TODO : Show Error Message through this.state.errors
        }
        this.props.dispatch(setAuthedUser( {
            id: this.state.selectedUser
        }))        

        return this.props.history.push('/')
    }

    render() {
        return (
            <Card fluid className="user-login-page">
                <Header as="h3">Please select your username to connect:</Header>
                <select className="login-select" onChange={this.handleChange.bind(this)}>
                    <option value=""></option>
                    { this.props.usersList.map((userId) => <option key={userId} value={userId}>{this.props.users[userId].name}</option>) }
                </select>
                <Button primary className="btn-login" fluid onClick={this.handleSelectUser}>Connect</Button>
            </Card>
        )
    }
}

function mapStateToProps(state) {
    let usersArray = [];

    for(let user in state.users) {
        usersArray.push(user)
    }

    return {
        dispatch: state.dispatch,
        authedUser: state.authedUser,
        users: state.users,
        usersList: usersArray
    }
}

export default withRouter(connect(mapStateToProps)(LoginPage))