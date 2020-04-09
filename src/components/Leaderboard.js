import React from 'react'
import { connect } from 'react-redux'
import { Card, Segment, Grid, Header, Image} from 'semantic-ui-react'
import styles from './css/leaderboard.module.css';

function Leaderboard(props) {
    const { users } = props

    return (
        <div className={styles.leaderboard}>
            <Segment attached="bottom">
                <Card.Group>
                    { users.map( (user, i) => 
                    (<Card fluid className={styles.userLeaderboard} key={user.id}>
                        <Grid columns={3} divided>
                            <Grid.Row>
                                <Grid.Column width={3} className={styles.columnAvatar} textAlign='center'>
                                    <Image src={user.avatarURL} alt={"Avatar of " + user.name} className={styles.leaderboardUserAvatar} />
                                    { i+1 === 1 && (<img src="https://imgur.com/XJ6rEXa.png" width="70px" alt="Gold Medal"/>)}
                                    { i+1 === 2 && (<img src="https://imgur.com/FaVRPTq.png" width="70px" alt="Silver Medal"/>)}
                                    { i+1 === 3 && (<img src="https://imgur.com/fRGjdUr.png" width="70px" alt="Bronze Medal"/>)}
                                </Grid.Column>
                                <Grid.Column width={10} className={styles.columnDetails}>
                                    <Grid.Row className={styles.rowUserName}><Header className={styles.leaderboardUserName}>{user.name}</Header></Grid.Row>
                                    <Grid.Row className={styles.rowUserAnsweredQuestions}><div className={styles.userAnsweredQuestions}>Answered questions: { Object.keys(user.answers).length }</div></Grid.Row>
                                    <Grid.Row className={styles.rowUserCreatedQuestions}><div className={styles.userCreatedQuestions}>Created questions: { user.questions.length }</div></Grid.Row>
                                </Grid.Column>
                                <Grid.Column width={3} className={styles.columnScore} textAlign='center'>
                                    <div className={styles.userScore}>
                                        <Header className={styles.scoreTitle}>Score</Header>
                                        <div className={styles.currentScore}>{user.score}</div>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Card>)
                    )}
                </Card.Group>
            </Segment>
        </div>
    )   
}

function mapStateToProps({ users, dispatch }) {
    let u = Object.values(users);
    u.map((user) => { 
        user.score = Object.keys(user.answers).length + user.questions.length
        return user
    })
    u.sort((a, b) => { return b.score - a.score})
    
    return {
        dispatch,
        users: u
    }
}

export default connect(mapStateToProps)(Leaderboard)