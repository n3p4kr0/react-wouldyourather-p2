import React, {Component} from 'react'
import { Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'

class Header extends Component {
    render() {
        return (
            <Menu fluid className="header-menu">
                <Menu.Item
                name='home'
                //active={activeItem === 'home'}
                //onClick={this.handleItemClick}
                >
                Home
                </Menu.Item>

                <Menu.Item
                name='new-question'
                //active={activeItem === 'reviews'}
                //onClick={this.handleItemClick}
                >
                New Question
                </Menu.Item>

                <Menu.Item
                name='leaderboard'
                //active={activeItem === 'upcomingEvents'}
                //onClick={this.handleItemClick}
                >
                Leaderboard
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
