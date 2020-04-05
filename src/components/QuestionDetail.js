import React, { Component } from 'react';
import { connect } from 'react-redux'
import './css/QuestionDetail.css'
import { updateQuestionVote } from '../actions/questions'
import { Card, Grid, Button, Divider, Header, Segment } from 'semantic-ui-react'

class QuestionDetail extends Component {
  state = {
      clicksOptionOne: 0,
      clicksOptionTwo: 0
  }

  voteOptionOne = () => {
    const { dispatch, question, authedUser } = this.props

    const selectedAnswer = "optionOne"

    dispatch(updateQuestionVote({
        qid: question.id,
        answer: selectedAnswer,
        authedUser: authedUser
    }))
  }

  voteOptionTwo = () => {
    const { dispatch, question, authedUser } = this.props

    const selectedAnswer = "optionTwo"

    dispatch(updateQuestionVote({
        qid: question.id,
        answer: selectedAnswer,
        authedUser: authedUser
    }))
  }

  render() {
      const { question } = this.props

        return (
        <Card fluid className="question-item">
            {/*<img src={question.author.avatarURL} />*/}
            <Header>{question.author.name + " asks..."}</Header><br /><br />
            
            Would you rather...<br /><br />
            <Segment>
                <Grid columns={2} stackable textAlign='center' className="question-grid">
                    <Divider vertical>Or</Divider>

                    <Grid.Row verticalAlign='middle' className="options">
                        <Grid.Column className="option optionOne" onClick={this.voteOptionOne}>
                        <Header>
                            {question.optionOne.text}<br />{question.optionOne.votes.length}
                        </Header>
                        </Grid.Column>

                        <Grid.Column className="option optionTwo" onClick={this.voteOptionTwo}>
                        <Header>
                            {question.optionTwo.text}<br />{question.optionTwo.votes.length}
                        </Header>
                        </Grid.Column>
                    </Grid.Row>
                </Grid> 
            </Segment>                
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

export default connect(mapStateToProps)(QuestionDetail);
