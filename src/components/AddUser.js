import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddUser } from '../actions/users'
import { Card, Header, Input, Button, Dimmer, Loader } from 'semantic-ui-react'
import { Link } from "react-router-dom"
import validUrl from "valid-url"
import styles from './css/addUser.module.css'


class AddUser extends Component {
    state = {
        name: '',
        avatarURL: '',
        isValidURL: false,
        loading: false
    }

    checkEmpty = (e) => {
        const inputChanged = e.target.id
        const inputValue = e.target.value
        
        if(e.target.value === '') {
            e.target.parentNode.classList.toggle("error");
        }
        else if (e.target.parentNode.classList.contains("error")) {
            e.target.parentNode.classList.toggle("error")
        }

        if(inputChanged === 'avatarURL') {
            if(validUrl.isUri(inputValue)) {
                this.setState((prevState) => ({ ...prevState, isValidURL: true }))
            } else {
                this.setState((prevState) => ({ ...prevState, isValidURL: false }))
            }
        }

        this.setState((prevState) => ({
            ...prevState,
            [inputChanged]: inputValue
        }))
    }

    handleAddUser = (e) => {
        e.preventDefault();
        this.setState((prevState) => ({
            ...prevState,
            loading: true
        }))
        
        this.props.dispatch(handleAddUser( {
            name: this.state.name,
            avatarURL: this.state.avatarURL
        }))
          .then(() => {
              return this.props.history.push('/') 
        })
    }

    render() {
        return (
            <div>
                (<Card className={styles.moduleAddUser}>
                    <Header as="h2" className={styles.textRegister}>Register</Header>
                    { this.props.authedUser === null 
                        ? 
                        (<div className={styles.registrationForm}>
                            <Input fluid placeholder="Name" id="name" className={styles.inputName} onChange={this.checkEmpty} value={this.state.name}/> 
                            <Input fluid placeholder="Avatar URL" id="avatarURL" className={styles.inputAvatarURL} onChange={this.checkEmpty} value={this.state.avatarURL}/>
                            <Button primary className={styles.btnAddUser} onClick={this.handleAddUser} disabled={this.state.name === '' || !this.state.isValidURL } >Register</Button>
                        </div>)
                           
                        : <p>You cannot register as you're already <Link to="/logout">logged in</Link>.</p>
                    }
                </Card>)
                {(this.state.loading &&
                    <Dimmer active>
                        <Loader content='Loading' />
                    </Dimmer>)}
            </div>
        )
    }
}

function mapStateToProps({ authedUser, dispatch }) {
    return {
        authedUser,
        dispatch
    }
}

export default connect(mapStateToProps)(AddUser)