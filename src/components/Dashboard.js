import React, { Component } from 'react';
import { connect } from 'react-redux'
import './css/Dashboard.css'
import Question from './Question'
import { Menu, Segment, Card } from 'semantic-ui-react'

class Dashboard extends Component {
    state = { 
        activeItem: 'unanswered-items'
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { questions, authedUser, users } = this.props
        const { activeItem } = this.state
        
        return (
        <div className="dashboard">
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
                {/*<Menu.Menu position='center'>
                    <Menu.Item>
                    <Input icon='search' placeholder='Search...' />
                    </Menu.Item>
                </Menu.Menu>*/}
            </Menu>
            <Segment attached="bottom">
                <Card.Group>
                    { activeItem === 'answered-questions'
                    ? Object.keys(questions).map( (key) => users[authedUser].answers.hasOwnProperty(key) && <Question id={key} key={key} />)
                    : Object.keys(questions).map( (key) => !users[authedUser].answers.hasOwnProperty(key) && <Question id={key} key={key} />)
                    }
                </Card.Group>
            </Segment>
        </div>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }) {
    return {
        authedUser,
        questions,
        users
    };
}

export default connect(mapStateToProps)(Dashboard);
