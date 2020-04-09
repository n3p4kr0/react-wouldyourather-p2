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
        const { question } = this.props

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
                                <Grid.Column id="optionOne" className={styles.option} onClick={this.vote} >
                                    <div className={styles.optionContent}>{question.optionOne.text}</div><br />
                                    {question.optionOne.votes.length} ({ (question.optionOne.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length) * 100).toFixed(2)}%)
                                </Grid.Column>

                                <Grid.Column id="optionTwo" className={styles.option} onClick={this.vote}>
                                    <div className={styles.optionContent}>{question.optionTwo.text}</div><br />
                                    {question.optionTwo.votes.length} ({ (question.optionTwo.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length) * 100).toFixed(2)}%)
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
