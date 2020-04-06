import React, { Component } from 'react';
import { connect } from 'react-redux'
import './css/Question.css'
import { Link } from 'react-router-dom'
import { Card, Grid, Button } from 'semantic-ui-react'

class Question extends Component {
  render() {
      const { question } = this.props
        return (
        <Card fluid className="question-item" header={question.author.name + " asks..."}>
            <div className="question-item-content">
                <div className="question-author-picture">
                    <img src={question.author.avatarURL} />
                </div>
                <div className="question-options">
                    Would you rather...<br /><br />
                    { question.optionOne.text } <b>or</b>... 
                </div>
            </div>
            <Link to={"/question/" + question.id} className="btn-see-question">
                <Button primary fluid>View Poll</Button>
            </Link>
        </Card>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
    const question = questions[id]
    console.log(users[question.author])

    return {
        authedUser,
        question: {
            ...question,
            author: users[question.author]
        }
    };
}

export default connect(mapStateToProps)(Question);
