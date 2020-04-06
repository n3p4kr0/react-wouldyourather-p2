import React, {Component} from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../actions/authedUser'

class AppHeader extends Component {
    logout = () => {
        const { dispatch } = this.props

        dispatch(logout())
    }

    render() {
        return (
            <Menu fluid className="header-menu">
                <Menu.Item
                name='home'>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item
                name='new-question'>
                    <Link to="/add">Add Question</Link>
                </Menu.Item>
                <Menu.Item
                name='leaderboard'>
                    <Link to="/leaderboard">Leaderboard</Link>
                </Menu.Item>
                {this.props.authedUser !== null 
                
                ? 
                <Menu.Menu position='right'>
                    <div className="user-name">Hello, { this.props.userName } !</div>
                    <Menu.Item
                    name='logout'
                    onClick={this.logout}>
                        Logout
                    </Menu.Item>
                </Menu.Menu>

                : <Menu.Menu position='right'>
                    <Menu.Item
                    name='login'>
                        <Link to="/login">Login</Link>
                    </Menu.Item>
                </Menu.Menu> }
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

export default connect(mapStateToProps)(AppHeader);
