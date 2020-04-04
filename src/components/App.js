import React, { Component } from 'react';
import '../App.css';
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import Question from './Question'

class App extends Component {
 componentDidMount() {
    this.props.dispatch(handleInitialData())
    /*this.props.dispatch(handleAddQuestion( {
      optionOneText: 'number 1',
      optionTwoText: 'number 2'
    }))*/
  }

  render() {
    return (
      <div className="App">
        { Object.keys(this.props.questions).map( (id) => (
          <Question key={id} id={id} />
         ) ) }
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  console.log(authedUser);
  return {
    authedUser,
    users: users,
    questions: questions
  };
}

export default connect(mapStateToProps)(App);
