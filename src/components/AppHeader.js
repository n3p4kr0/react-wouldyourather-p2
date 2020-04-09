import React, {Component} from 'react'
import { Menu, Header } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../actions/authedUser'
import styles from './css/appHeader.module.css'

class AppHeader extends Component {
    logout = () => {
        const { dispatch } = this.props

        dispatch(logout())

        this.props.history.push('/login') 
    }

    render() {
        return (
            <div className={styles.appHeader}>
                <div className={styles.headerTitleBar}>
                    <Link to="/"><Header as="h1" className={styles.headerTitle}>Would you rather?</Header></Link>
                </div>
                <Menu fluid className={styles.headerMenu}>
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
                            <div className={styles.userName}>
                                <img src={this.props.avatarURL} alt={this.props.userName + "'s avatar miniature"} className={styles.appHeaderAvatar}/>
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
                        <Menu.Item
                        name='register'>
                            <Link to="/register">Register</Link>
                        </Menu.Item>
                    </Menu.Menu> }
                </Menu>
            </div>
        )
    }
}


function mapStateToProps({ authedUser, users }) {
    // Don't try to set the userName or the avatarURL if the user is not logged in (would result in an Exception thrown)
    let userName = (authedUser !== null) ? users[authedUser].name : null
    let avatarURL = (authedUser !== null) ? users[authedUser].avatarURL : null
    
    return {
        authedUser,
        userName,
        avatarURL
    };
}

export default withRouter(connect(mapStateToProps)(AppHeader));
