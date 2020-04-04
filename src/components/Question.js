import React, { Component } from 'react';
import { handleInitialData } from '../actions/shared'
import { handleAddQuestion } from '../actions/questions'
import { connect } from 'react-redux'
import './css/Question.css'

class Question extends Component {
  render() {
      const { question } = this.props
        return (
        <div className="question-item">
            <div className="question-item-title">
                { question.author.name } asks...
            </div>
            <div className="question-item-content">
                <div className="question-author-picture">

                </div>
                <div className="question-options">
                    Would you rather...<br /><br />
                    { question.optionOne.text } <b>or</b>... 
                </div>
            </div>
        </div>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
    const question = questions[id]
    console.log(question);

    return {
        authedUser,
        question: {
            ...question,
            author: users[question.author]
        }
    };
}

export default connect(mapStateToProps)(Question);
