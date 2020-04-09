import React from 'react'
import { connect } from 'react-redux'
import { Card, Segment, Grid, Header, Image} from 'semantic-ui-react'
//import { showLoading, hideLoading, LoadingBar } from 'react-redux-loading-bar'
import './css/Leaderboard.css'

function Leaderboard(props) {
    const { users, sortedLeaderboard} = props

    return (
        <div className="leaderboard">
            <Segment attached="bottom">
                <p>{users.length}</p>
                <Card.Group>
                    { sortedLeaderboard.map( (qid, i) => 
                    (<Card fluid className="user-leaderboard" key={qid}>
                        <Grid columns={3} divided>
                            <Grid.Row>
                                <Grid.Column width={3} className="column-avatar" textAlign='center'>
                                    { i+1 === 1 && (<p>First</p>)} 
                                    { i+1 === 2 && (<p>Second</p>)} 
                                    { i+1 === 3 && (<p>Third</p>)}
                                    <Image src={users[qid].avatarURL} alt={"Avatar of " + users[qid].name} className="leaderboard-user-avatar" />
                                </Grid.Column>
                                <Grid.Column width={10}>
                                    <Header>{users[qid].name}</Header>
                                    <div className="user-results"></div>
                                    <div className="user-answered-questions">Answered questions: { Object.keys(users[qid].answers).length }</div>
                                    <div className="user-created-questions">Created questions: { users[qid].questions.length }</div>
                                </Grid.Column>
                                <Grid.Column width={3} className="column-score" textAlign='center'>
                                    <div className="user-score">
                                        <Header>Score</Header>
                                        {users[qid].score}
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

    Object.keys(users).map( function(key) {
        const sum = Object.keys(users[key].answers).length + users[key].questions.length
        users[key] = {
            ...users[key],
            score: sum
        }
        return users[key]
    })

    let sortedLeaderboard = Object.keys(users).sort(function(a,b){return users[b].score - users[a].score})
    
    return {
        dispatch,
        users,
        sortedLeaderboard
    }
}

export default connect(mapStateToProps)(Leaderboard)