import React, { Component } from 'react'
import { connect } from 'react-redux'
import './css/AddQuestion.css'
import { handleAddQuestion } from '../actions/shared'
import { Card, Header, Input, Button } from 'semantic-ui-react'
import { withRouter } from "react-router-dom";

class AddQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
        errors: {
            optionOne: '',
            optionTwo: ''
        }
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
        
        this.props.dispatch(handleAddQuestion( {
            optionOneText: this.state.optionOne,
            optionTwoText: this.state.optionTwo
        }))
          .then((question) => {
              return this.props.history.push('/questions/' + question.id) 
        })
    }

    render() {
        return (
            <Card className="module-add-question">
                <Header>Would you rather... ?<br /><br /></Header>
                <Input placeholder="Option 1" id="optionOne" className="input-option-one" onChange={this.checkEmpty} />
                
                <Input placeholder="Option 2" id="optionTwo" className="input-option-two" onChange={this.checkEmpty} /><br />
                <Button primary onClick={this.handleAddQuestion}>Add question</Button>
            </Card>
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
