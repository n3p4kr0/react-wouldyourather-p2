import React, { Component } from 'react';
//import styles from './css/app.module.css';
import { handleInitialData } from '../store/actions/shared'
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading-bar'
import 'semantic-ui-css/semantic.min.css'
import AppHeader from './AppHeader'
import QuestionDetail from './QuestionDetail'
import Dashboard from './Dashboard'
import Leaderboard from './Leaderboard'
import AddQuestion from './AddQuestion'
import LoginPage from './LoginPage'
import NotFoundPage from './NotFoundPage'
import AddUser from './AddUser'

class App extends Component {
 componentDidMount() {
   // Only fetch data if not retrieved from local store (only fetch data from database if the App's questions and users lists are empty)
   if(Object.keys(this.props.users).length === 0 || Object.keys(this.props.questions).length === 0) {
      this.props.dispatch(handleInitialData())
   }
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
                  <Route exact path="/register" component={AddUser} />
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
    authedUser,
    users, 
    questions
  };
}

export default connect(mapStateToProps)(App);
