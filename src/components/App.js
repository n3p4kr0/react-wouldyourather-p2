import React, { Component } from 'react';
import '../App.css';
import { handleInitialData } from '../actions/shared'
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import 'semantic-ui-css/semantic.min.css'
import Header from './Header'
import QuestionDetail from './QuestionDetail'
import Dashboard from './Dashboard'
import AddQuestion from './AddQuestion'

class App extends Component {
 componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
        <div>
          <LoadingBar />
          { !this.props.loading
            ? (<div>
            <BrowserRouter>
              <Header />
              <Switch>
                <Route exact path="/">
                  <Dashboard />
                </Route>
                <Route exact path="/add">
                  <AddQuestion />
                </Route>
                <Route exact path="/leaderboard">
                  <Dashboard />
                </Route>
                <Route exact path="/login">
                  <Dashboard />
                </Route>
                <Route exact path="/questions/:id">
                  <QuestionDetail />
                </Route>
              </Switch>
            </BrowserRouter></div>)



            : (<p>Loading...</p>)
          }
        </div>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  };
}

export default connect(mapStateToProps)(App);


      /*<div className="App">
        { Object.keys(this.props.questions).map( (id) => (
          <Question key={id} id={id} />
         ) ) }
        </div>*/