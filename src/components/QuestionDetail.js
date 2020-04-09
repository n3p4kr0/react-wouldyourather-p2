import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './css/QuestionDetail.css'
import { handleVote } from '../actions/shared'
import { Card, Grid, Divider, Header, Segment, Dimmer, Loader } from 'semantic-ui-react'

class QuestionDetail extends Component {
    state = {
        loading: false
    }

    vote = (event) => {
        const { dispatch, question, authedUser } = this.props

        if(!Object.keys(authedUser.answers).includes(question.id)) {
            this.setState({
                loading: true
            })

            dispatch(handleVote({
                qid: question.id,
                answer: event.target.id,
                authedUser: authedUser.id
            })).then(() => {
                this.setState({
                    loading: false
                })
            })
        }
    }

    render() {
        const { authedUser, question } = this.props

        return (
        <div>
            <Segment attached="bottom" className="seg-question-detail">
                <Card fluid className="question-item">
                    <Header className="user-asks">{question.author.name + " asks..."}</Header><br /><br />
                    
                    <Header className="would-you-rather-desc">Would you rather...</Header>
                    <Segment>
                        <Grid columns={2} stackable textAlign='center' className="question-grid">
                            <Divider vertical>Or</Divider>
                            <Grid.Row verticalAlign='middle' className="options">
                                <Grid.Column id="optionOne" className={ "option" + (question.optionOne.votes.filter((voter) => { return voter === authedUser.id }).length === 1 ? " voted" : "")} onClick={this.vote} >
                                    {question.optionOne.text}<br />{question.optionOne.votes.length} ({ question.optionOne.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length) * 100}%)
                                </Grid.Column>

                                <Grid.Column id="optionTwo" className={ "option" + (question.optionTwo.votes.filter((voter) => { return voter === authedUser.id }).length === 1 ? " voted" : "")} onClick={this.vote}>
                                    {question.optionTwo.text}<br />{question.optionTwo.votes.length} ({ question.optionTwo.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length) * 100}%)
                                </Grid.Column>
                            </Grid.Row>
                        </Grid> 
                    </Segment>                
                </Card>
            </Segment>
            
        { this.state.loading &&
            <Dimmer active>
                  <Loader content='Loading' />
            </Dimmer>
        }
        </div>
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
