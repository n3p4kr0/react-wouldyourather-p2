import React from 'react';
import { connect } from 'react-redux'
import styles from './css/question.module.css'
import { Link } from 'react-router-dom'
import { Card, Button, Header } from 'semantic-ui-react'

function Question (props) {
    const { question, authedUser } = props
    
    return (
        <Card fluid className={styles.questionItem}>
            <Header>{question.author.name + " asks..."}</Header>
            <div className={styles.questionItemContent}>
                <div className={styles.questionAuthorPicture}>
                    <img src={question.author.avatarURL} alt={"Avatar of " + question.author.name} />
                </div>
                <div className={styles.questionOptions}>
                    <Header className={styles.wouldYouRatherText}>Would you rather...</Header>
                    { question.optionOne.text } <b>or</b>... 
                </div>
            </div>
            <div className={styles.questionItemButton}>
                { authedUser === null 
                    ? <Button disabled className={styles.btnSeeQuestion}>Please connect to view poll</Button>
                    : <Link to={"/questions/" + question.id} className={styles.btnSeeQuestion}><Button primary fluid>View Poll</Button></Link>
                }
            </div>
        </Card>
    )
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
    return {
        authedUser,
        question: {
            ...questions[id],
            author: users[questions[id].author]
        }
    };
}

export default connect(mapStateToProps)(Question);
