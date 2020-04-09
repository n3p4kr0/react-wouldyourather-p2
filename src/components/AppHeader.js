import React, {Component} from 'react'
import { Menu, Header } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../actions/authedUser'
import './css/AppHeader.css'

class AppHeader extends Component {
    logout = () => {
        const { dispatch } = this.props

        dispatch(logout())

        this.props.history.push('/login') 
    }

    render() {
        return (
            <div className="app-header">
                <div className="header-title-bar"><Header as="h1" className="header-title">Would you rather?</Header></div>
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
                        { this.props.userName !== null && 
                            <div className="user-name">
                                <img src={this.props.avatarURL} alt={this.props.userName + "'s avatar miniature"} className="app-header-avatar"/>
                                Hello, { this.props.userName } !
                            </div> 
                        }
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
            </div>
        )
    }
}


function mapStateToProps({ authedUser, users }) {
    let userName = (authedUser !== null) ? users[authedUser].name : null
    let avatarURL = (authedUser !== null) ? users[authedUser].avatarURL : null
    
    return {
        authedUser,
        userName,
        avatarURL
    };
}

export default withRouter(connect(mapStateToProps)(AppHeader));
