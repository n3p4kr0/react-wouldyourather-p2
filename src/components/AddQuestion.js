import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../store/actions/shared'
import { Card, Header, Input, Button, Dimmer, Loader } from 'semantic-ui-react'
import { withRouter } from "react-router-dom";
import styles from './css/addQuestion.module.css'

class AddQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
        loading: false
    }

    checkEmpty = (e) => {
        const optionChanged = e.target.id
        const optionValue = e.target.value
        
        if(e.target.value === '') {
            e.target.parentNode.classList.toggle("error");
        }
        else if (e.target.parentNode.classList.contains("error")) {
            e.target.parentNode.classList.toggle("error")
        }

        this.setState((prevState) => ({
            ...prevState,
            [optionChanged]: optionValue
        }))
    }

    handleAddQuestion = (e) => {
        e.preventDefault();
        this.setState((prevState) => ({
            ...prevState,
            loading: true
        }))
        
        this.props.dispatch(handleAddQuestion( {
            optionOneText: this.state.optionOne,
            optionTwoText: this.state.optionTwo
        }))
          .then((question) => {
              return this.props.history.push('/') 
        })
    }

    render() {
        return (
            <div>
                <Card className={styles.moduleAddQuestion}>
                    <Header as="h2" className={styles.addWouldYouRather}>Would you rather... ?</Header>
                    <Input placeholder="Option 1" id="optionOne" className={styles.inputOptionOne} onChange={this.checkEmpty} />
                    
                    <Input placeholder="Option 2" id="optionTwo" className={styles.inputOptionTwo} onChange={this.checkEmpty} />
                    <Button primary className={styles.btnAddQuestion} onClick={this.handleAddQuestion} disabled={this.state.optionOne === '' || this.state.optionTwo === ''} >Add question</Button>
                </Card>
                { this.state.loading &&
                <Dimmer active>
                      <Loader content='Loading' />
                </Dimmer>
                }
            </div>
        )
    }
}


function mapStateToProps({ authedUser, dispatch }) {
    return {
        authedUser,
        dispatch
    };
}

export default withRouter(connect(mapStateToProps)(AddQuestion))
