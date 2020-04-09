import React, { Component } from 'react';
import { connect } from 'react-redux'
import Question from './Question'
import { Menu, Segment, Card } from 'semantic-ui-react'
import styles from './css/dashboard.module.css'

class Dashboard extends Component {
    state = { 
        activeItem: 'unanswered-questions',      
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { questions, authedUser, users } = this.props
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
                    { (authedUser !== null && activeItem === 'answered-questions' ) 
                        && ( questions.map((question) => users[authedUser].answers.hasOwnProperty(question.id) && <Question id={question.id} key={question.id} />))  
                    }
                    { (authedUser !== null && activeItem === 'unanswered-questions' ) 
                        && ( questions.map((question) => !users[authedUser].answers.hasOwnProperty(question.id) && <Question id={question.id} key={question.id} />))  
                    }                
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

    return {
        authedUser,
        questions: q,
        users
    };
}

export default connect(mapStateToProps)(Dashboard);
