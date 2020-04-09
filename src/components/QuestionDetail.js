import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from './css/questionDetail.module.css'
import { handleVote } from '../actions/shared'
import { Card, Grid, Divider, Header, Segment, Dimmer, Loader } from 'semantic-ui-react'
import { Redirect } from "react-router-dom";

class QuestionDetail extends Component {
    state = {
        loading: false
    }

    // Required : if the user clicks on the text instead of a white zone in the clickable vote zone, the wrong target is passed to the event
    // and the vote(event) method cannot read event.target.value. With this hack, event.target.id takes the id of the parentNode when the 
    // text is clicked instead of a blank zone.
    triggerVote = (event) => {
        event.target.id = event.target.parentNode.id
        this.vote(event)
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
        // If no question exists with the passed ID, redirect to 404 before rendering
        if(this.props.hasOwnProperty('notExistingId') && this.props.notExistingId === true) {
            return <Redirect to='/not-found' />
        }

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
                    <img src={question.author.avatarURL} width="150px" alt={authedUser.name + "'s avatar"} />
                    <Header as="h2" className={styles.userAsks}>{question.author.name + " asks..."}</Header><br /><br />
                    
                    <Header className={styles.wouldYouRatherDesc}>Would you rather...</Header>
                    <Segment className={styles.segContent}>
                        <Grid columns={2} stackable textAlign='center' className={styles.questionGrid}>
                            <Divider vertical>Or</Divider>
                            <Grid.Row verticalAlign='middle' className={styles.options}>
                                <Grid.Column id="optionOne" className={[styles.option, classVotedOptionOne].join(' ')} onClick={this.vote} >
                                    <div className={styles.optionContent} onClick={this.triggerVote}>{question.optionOne.text}</div>
                                    {authedUser.answers.hasOwnProperty(question.id) && 
                                        (question.optionOne.votes.length +  ' vote' + (question.optionOne.votes.length !== 1 ? 's' : '') + ' (' + (question.optionOne.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length) * 100).toFixed(2) + '%)') }
                                </Grid.Column>

                                <Grid.Column id="optionTwo" className={[styles.option, classVotedOptionTwo].join(' ')} onClick={this.vote} >
                                    <div className={styles.optionContent} onClick={this.triggerVote}>{question.optionTwo.text}</div>
                                    {authedUser.answers.hasOwnProperty(question.id) && 
                                        (question.optionTwo.votes.length +  ' vote' + (question.optionTwo.votes.length !== 1 ? 's' : '') + ' (' + (question.optionTwo.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length) * 100).toFixed(2) + '%)') }
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
    // If no question exists with the passed ID, creates the Component which will redirect to 404 in constructor
    if(questions[params.match.params.id] === undefined) {
        return {
            notExistingId: true
        }
    }

    return {
        authedUser: users[authedUser],
        question: {
            ...questions[params.match.params.id],
            author: users[questions[params.match.params.id].author]
        }
    };
}

export default withRouter(connect(mapStateToProps)(QuestionDetail));
