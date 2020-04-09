import React, { Component } from 'react';
//import styles from './css/app.module.css';
import { handleInitialData } from '../actions/shared'
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import 'semantic-ui-css/semantic.min.css'
import AppHeader from './AppHeader'
import QuestionDetail from './QuestionDetail'
import Dashboard from './Dashboard'
import Leaderboard from './Leaderboard'
import AddQuestion from './AddQuestion'
import LoginPage from './LoginPage'
import NotFoundPage from './NotFoundPage'

class App extends Component {
 componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
        <div>
        <LoadingBar />
          { !this.props.loading && 
            (<BrowserRouter>
              <AppHeader />
              { this.props.authedUser !== null
                ?
                  <Switch>
                    <Route exact path="/">
                      <Dashboard />
                    </Route>
                    <Route exact path="/login">
                      <LoginPage />
                    </Route>
                    <Route exact path="/add">
                      <AddQuestion />
                    </Route>
                    <Route exact path="/leaderboard">
                      <Leaderboard />
                    </Route>
                    <Route exact path="/questions/:id">
                      <QuestionDetail />
                    </Route>
                    <Route exact path="/not-found" component={NotFoundPage} />
                  </Switch>
                :
                <Switch>
                  <Route component={LoginPage} />
                </Switch>
              }
            </BrowserRouter>)
          }
        </div>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }) {  
  return {
    loading: (users === {} || questions === {}),
    authedUser
  };
}

export default connect(mapStateToProps)(App);
