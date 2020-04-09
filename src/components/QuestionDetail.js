import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from './css/questionDetail.module.css'
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
        const { question, authedUser } = this.props
        /* 
         * Those two const are required to add multiples styles to "option" classes (i.e. the options for the user to vote for)
         * If one of the option is the one the user voted for, it will apply the .voted class to the User's chosen option.
         */
        const classVotedOptionOne = question.optionOne.votes.filter((voter) => { return voter === authedUser.id }).length === 1 ? styles.voted : '';
        const classVotedOptionTwo = question.optionTwo.votes.filter((voter) => { return voter === authedUser.id }).length === 1 ? styles.voted : '';

        return (
        <div>
            <Segment attached="bottom" className={styles.segQuestionDetail}>
                <Card fluid className={styles.questionItem}>
                    <Header className={styles.userAsks}>{question.author.name + " asks..."}</Header><br /><br />
                    
                    <Header className={styles.wouldYouRatherDesc}>Would you rather...</Header>
                    <Segment>
                        <Grid columns={2} stackable textAlign='center' className={styles.questionGrid}>
                            <Divider vertical>Or</Divider>
                            <Grid.Row verticalAlign='middle' className={styles.options}>
                                <Grid.Column id="optionOne" className={[styles.option, classVotedOptionOne].join(' ')} onClick={this.vote} >
                                    <div className={styles.optionContent}>{question.optionOne.text}</div><br />
                                    {question.optionOne.votes.length} ({ (question.optionOne.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length) * 100).toFixed(2)}%)
                                </Grid.Column>

                                <Grid.Column id="optionTwo" className={[styles.option, classVotedOptionTwo].join(' ')} onClick={this.vote} >
                                    <div className={styles.optionContent}>{question.optionTwo.text}</div><br />
                                    {question.optionTwo.votes.length} ({ (question.optionTwo.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length) * 100).toFixed(2)}%)
                                </Grid.Column>
                            </Grid.Row>
                        </Grid> 
                    </Segment>                
                </Card>
            </Segment>
            
        { // The loading spinner only shows when this.state.loading === true 
          //(when dispatch is called to submit the user's vote to the API)
        this.state.loading &&
            <Dimmer active>
                  <Loader content='Loading' />
            </Dimmer>
        }
        </div>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }, params) {
    return {
        authedUser: users[authedUser],
        question: {
            ...questions[params.match.params.id],
            author: users[questions[params.match.params.id].author]
        }
    };
}

export default withRouter(connect(mapStateToProps)(QuestionDetail));
