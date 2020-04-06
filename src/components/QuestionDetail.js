import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './css/QuestionDetail.css'
import { handleVote } from '../actions/shared'
import { Card, Grid, Divider, Header, Segment } from 'semantic-ui-react'

class QuestionDetail extends Component {
  vote = (event) => {
    const { dispatch, question, authedUser } = this.props

    console.log(Object.keys(authedUser.answers))
    if(!Object.keys(authedUser.answers).includes(question.id)) {
        
        dispatch(handleVote({
            qid: question.id,
            answer: event.target.id,
            authedUser: authedUser.id
        }))
    }
  }

  render() {
      const { authedUser, question } = this.props

        return (
        <Card fluid className="question-item">
            {/*<img src={question.author.avatarURL} />*/}
            <Header className="user-asks">{question.author.name + " asks..."}</Header><br /><br />
            
            <div className="would-you-rather-desc">Would you rather...</div>
            <Segment>
                <Grid columns={2} stackable textAlign='center' className="question-grid">
                    <Divider vertical>Or</Divider>
                    <Grid.Row verticalAlign='middle' className="options">
                        <Grid.Column id="optionOne" className={ "option" + (question.optionOne.votes.filter((voter) => { return voter === authedUser.id }).length === 1 ? " voted" : "")} onClick={this.vote} >
                            {question.optionOne.text}<br />{question.optionOne.votes.length}
                        </Grid.Column>

                        <Grid.Column id="optionTwo" className={ "option" + (question.optionTwo.votes.filter((voter) => { return voter === authedUser.id }).length === 1 ? " voted" : "")} onClick={this.vote}>
                            {question.optionTwo.text}<br />{question.optionTwo.votes.length}
                        </Grid.Column>
                    </Grid.Row>
                </Grid> 
            </Segment>                
        </Card>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }, params) {
    const question = questions[params.match.params.id]

    return {
        authedUser: users[authedUser],
        question: {
            ...question,
            author: users[question.author]
        }
    };
}

export default withRouter(connect(mapStateToProps)(QuestionDetail));
