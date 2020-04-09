import React, { Component } from 'react';
import { connect } from 'react-redux'
import './css/Question.css'
import { Link } from 'react-router-dom'
import { Card, Button, Header } from 'semantic-ui-react'

class Question extends Component {
  render() {
      const { question, authedUser } = this.props
        return (
        <Card fluid className="question-item">
            <Header>{question.author.name + " asks..."}</Header>
            <div className="question-item-content">
                <div className="question-author-picture">
                    <img src={question.author.avatarURL} alt={"Avatar of " + question.author.name} />
                </div>
                <div className="question-options">
                    <Header className="would-you-rather-text">Would you rather...</Header>
                    { question.optionOne.text } <b>or</b>... 
                </div>
            </div>
            <div className="question-item-button">
                { authedUser === null 
                    ? <Button disabled className="btn-see-question">Please connect to view poll</Button>
                    : <Link to={"/questions/" + question.id} className="btn-see-question"><Button primary fluid>View Poll</Button></Link>
                }
            </div>
        </Card>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
    const question = questions[id]

    return {
        authedUser,
        question: {
            ...question,
            author: users[question.author]
        }
    };
}

export default connect(mapStateToProps)(Question);
