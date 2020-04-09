import { getInitialData, saveQuestionAnswer, saveQuestion } from '../utils/api'
import { receiveUsers, updateUserVote, addQuestionUser } from '../actions/users'
import { receiveQuestions, updateQuestionVote, addQuestion } from '../actions/questions'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions));
        dispatch(hideLoading());
      })
  }
}

export function handleVote (info) {
  return (dispatch) => {
    return saveQuestionAnswer(info)
      .then((data) => {
        dispatch(updateQuestionVote(info))
        dispatch(updateUserVote(info))
    })
  }
}

export function handleAddQuestion ({ optionOneText, optionTwoText }) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    return saveQuestion({ optionOneText, optionTwoText, author: authedUser })
    .then((question) => { 
      dispatch(addQuestion(question))
      dispatch(addQuestionUser({ qid: question.id, authedUser: question.author }))
    })
  }
}



    /*const { authedUser } = getState();
    
    
}*/