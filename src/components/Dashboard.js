import React, { Component } from 'react';
import { connect } from 'react-redux'
import Question from './Question'
import { Menu, Segment, Card } from 'semantic-ui-react'
import styles from './css/dashboard.module.css'
import { Link } from 'react-router-dom'

class Dashboard extends Component {
    state = { 
        activeItem: 'unanswered-questions',      
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { questions, authedUser } = this.props
        const { activeItem } = this.state
        
        return (
        <div className={styles.dashboard}>
            <Menu pointing widths={2} attached="top">
                <Menu.Item
                    name='answered-questions'
                    active={activeItem === 'answered-questions'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='unanswered-questions'
                    active={activeItem === 'unanswered-questions'}
                    onClick={this.handleItemClick}
                />
            </Menu>
            <Segment attached="bottom">
                <Card.Group>
                    { (activeItem === 'answered-questions' ) 
                        && ( questions.map((question) => authedUser.answers.hasOwnProperty(question.id) && <Question id={question.id} key={question.id} />))  
                    }
                    { (activeItem === 'unanswered-questions' ) 
                        && ( questions.map((question) => !authedUser.answers.hasOwnProperty(question.id) && <Question id={question.id} key={question.id} />))  
                    }
                    { (activeItem === 'unanswered-questions' && Object.keys(authedUser.answers).length === Object.keys(questions).length )
                        && (<p>You've answered all the questions! Why not <Link to="/add">create some more of them</Link>? </p>) }
                    { (activeItem === 'answered-questions' && Object.keys(authedUser.answers).length === 0 )
                        && (<p>Come on... You should at least answer a few questions! Keep going like that and you'll be nowhere on the <Link to="/leaderboard">Leaderboard</Link> ! </p>) }
                </Card.Group>
            </Segment>
        </div>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }) {
    // Transforms the questions received from store, and sorts it in descending order 
    // (the most recent question first, based on question's timestamp)
    const q = Object.values(questions).sort((a, b) => { return b.timestamp - a.timestamp})

    console.log(q)
    console.log(authedUser)

    return {
        authedUser: users[authedUser],
        questions: q
    };
}

export default connect(mapStateToProps)(Dashboard);
