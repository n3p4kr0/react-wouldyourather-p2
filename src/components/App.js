import React, { Component } from 'react';
import '../App.css';
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
                </Switch>
                
                :
                <Switch>
                  <Route path="/">
                    <LoginPage />
                  </Route>
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
