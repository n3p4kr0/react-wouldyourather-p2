import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Header, Button, Select } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { setAuthedUser } from '../store/actions/authedUser'
import styles from "./css/loginPage.module.css"

class LoginPage extends Component {
    constructor (props) {
        super(props)
        this.state= { selectedUser: '' }

        // Required for the methods to refer to the right context when using "this"
        this.handleChange = this.handleChange.bind(this)
        this.handleClickConnect = this.handleClickConnect.bind(this)
    }

    handleChange(e, {value}) { this.setState( (prevState) => ({ selectedUser: value })) }

    handleClickConnect = (e) => {
        this.props.dispatch(setAuthedUser( {
            id: this.state.selectedUser
        }))
        if(this.props.location.pathname.startsWith('/questions/')) {
            return this.props.history.push(this.props.location.pathname)
        }
        return this.props.history.push('/')
    }

    render() {
        return (
            <div>
            { !this.props.loading &&
                (<Card fluid className={styles.userLoginPage}>
                    <Header as="h3">Please select your username to connect:</Header>
                    <Select placeholder="Select your profile" options={this.props.users} value={this.state.selectedUser} onChange={this.handleChange} />
                    <Button primary className={styles.btnLogin} fluid onClick={this.handleClickConnect} disabled={this.state.selectedUser === ''}>Connect</Button>
                </Card>)
            }
            </div>
        )
    }
}

function mapStateToProps({ dispatch, authedUser, users }) {
    // Transforms the users object into an array with specific values 
    // (for easier integration with Semantic UI library)
    let u = Object.values(users).map((user) => {
        user.key = user.id
        user.value = user.id
        user.text = user.name
        return user
    });

    return {
        loading: (Object.keys(users).length === 0),
        dispatch,
        authedUser,
        users: u
    }
}

export default withRouter(connect(mapStateToProps)(LoginPage))