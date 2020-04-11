import React, { Component } from 'react';
import { handleInitialData } from '../store/actions/shared'
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading-bar'
import 'semantic-ui-css/semantic.min.css'
import AppHeader from './AppHeader'
import AppRouter from './AppRouter'

class App extends Component {
 componentDidMount() {
   // Only fetch data if not retrieved from local store (only fetch data from database if the App's questions and users lists are empty)
   // CURRENTLY DISABLED AS IT BREAKS UDACITY'S PROJECT REQUIREMENTS
   //if(Object.keys(this.props.users).length === 0 || Object.keys(this.props.questions).length === 0) {
      this.props.dispatch(handleInitialData())
   //}
  }

  render() {
    return (
        <div>
        <LoadingBar />
          { !this.props.loading && 
            <BrowserRouter>
              <AppHeader />
              <AppRouter />
            </BrowserRouter>
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
