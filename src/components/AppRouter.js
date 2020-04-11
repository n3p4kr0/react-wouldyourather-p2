import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import QuestionDetail from './QuestionDetail'
import Dashboard from './Dashboard'
import Leaderboard from './Leaderboard'
import AddQuestion from './AddQuestion'
import LoginPage from './LoginPage'
import NotFoundPage from './NotFoundPage'
import AddUser from './AddUser'

const ProtectedRoute = ({ component: Comp, isLoggedIn, path, id, ...rest }) => {   
    if(path === '/questions/:id') {
        path = path.replace(/:id/, '')
    }

    return (
      <Route
        path={path}
        {...rest}
        render={props => {
          return isLoggedIn
            ? ( <Comp {...props} /> )
            : (
            <Redirect
              to={{
                pathname: "/login",
                prevLocation: {
                    route: path === '/questions/' ? path + props.match.params.id : path,
                }
              }}
            />
          );
        }}
      />
    );
  };
  
class AppRouter extends Component {
    render() {
        const { isLoggedIn } = this.props

        return (
            <Switch>
              <ProtectedRoute isLoggedIn={isLoggedIn} exact path="/" component={Dashboard} redirectToPath="/login"/>
              <ProtectedRoute isLoggedIn={isLoggedIn} exact path="/add" component={AddQuestion} redirectToPath="/login"/>
              <ProtectedRoute isLoggedIn={isLoggedIn} exact path="/leaderboard" component={Leaderboard} redirectToPath="/login"/>
              <ProtectedRoute isLoggedIn={isLoggedIn} exact path="/questions/:id" component={QuestionDetail} redirectToPath="/login"/>
              <ProtectedRoute isLoggedIn={isLoggedIn} exact path="/not-found" redirectToPath="/login" component={NotFoundPage} />

              {/* To access the Login page, the user should be !loggedIn */}
              <ProtectedRoute isLoggedIn={!isLoggedIn} exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={AddUser} />
            </Switch>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser,
        isLoggedIn: authedUser !== null
    }
}

export default connect(mapStateToProps)(AppRouter)