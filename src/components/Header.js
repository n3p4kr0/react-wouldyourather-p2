import React, {Component} from 'react'
import { Menu } from 'semantic-ui-react'
import { BrowserRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux'

class Header extends Component {
    render() {
        return (
            <Menu fluid className="header-menu">
                <Menu.Item
                name='home'>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item
                name='new-question'>
                    <Link to="/add-question">Add Question</Link>
                </Menu.Item>
                <Menu.Item
                name='leaderboard'>
                    <Link to="/leaderboard">Leaderboard</Link>
                </Menu.Item>
                <Menu.Menu position='right'>
                    <div className="user-name">Hello, { this.props.userName } !</div>
                    <Menu.Item
                    name='logout'>
                        Logout
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}


function mapStateToProps({ authedUser, users }) {
    const userName = users[authedUser].name
    return {
        authedUser,
        userName
    };
}

export default connect(mapStateToProps)(Header);
