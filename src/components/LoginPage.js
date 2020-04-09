import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Header, Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'
import styles from "./css/loginPage.module.css"

class LoginPage extends Component {
    constructor (props) {
        super(props)

        this.state= { selectedUser: '' }

        this.handleChange = this.handleChange.bind(this)
        this.handleSelectUser = this.handleSelectUser.bind(this)
    }

    handleChange(e) {
        const value = e.target.value
        this.setState( (prevState) => ({ selectedUser: value }))
    }

    handleSelectUser = (e) => {
        this.props.dispatch(setAuthedUser( {
            id: this.state.selectedUser
        }))        

        return this.props.history.push('/')
    }

    render() {
        return (
            <div>
            { !this.props.loading &&
                (<Card fluid className={styles.userLoginPage}>
                    <Header as="h3">Please select your username to connect:</Header>
                    <select className={styles.loginSelect} onChange={this.handleChange.bind(this)}>
                        <option value=""></option>
                        { this.props.usersList.map((userId) => <option key={userId} value={userId}>{this.props.users[userId].name}</option>) }
                    </select>
                    <Button primary className={styles.btnLogin} fluid onClick={this.handleSelectUser} disabled={this.state.selectedUser === ''}>Connect</Button>
                </Card>)
            }
            </div>
        )
    }
}

function mapStateToProps({ dispatch, state, authedUser, users }) {
    let usersArray = [];

    for(let user in users) {
        usersArray.push(user)
    }

    return {
        loading: (usersArray.length !== Object.keys(users).length || Object.keys(users).length === 0),
        dispatch: dispatch,
        authedUser: authedUser,
        users: users,
        usersList: usersArray,
    }
}

export default withRouter(connect(mapStateToProps)(LoginPage))