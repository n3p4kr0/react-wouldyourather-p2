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

class App extends Component {
 componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
        <div>
          <LoadingBar />
          { !this.props.loading &&
             (<div>
            <BrowserRouter>
              <AppHeader />
              <Switch>
                <Route exact path="/">
                  <Dashboard />
                </Route>
                <Route exact path="/add">
                  <AddQuestion />
                </Route>
                <Route exact path="/leaderboard">
                  <Leaderboard />
                </Route>
                <Route exact path="/login">
                  <Dashboard />
                </Route>
                <Route exact path="/questions/:id">
                  <QuestionDetail />
                </Route>
              </Switch>
            </BrowserRouter></div>)
          }
        </div>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
    authedUser
  };
}

export default connect(mapStateToProps)(App);
