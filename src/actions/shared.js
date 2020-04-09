import { getInitialData, saveQuestionAnswer, saveQuestion } from '../utils/api'
import { receiveUsers, updateUserVote, addQuestionUser } from '../actions/users'
import { receiveQuestions, updateQuestionVote, addQuestion } from '../actions/questions'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

/*
 * Called when App is mounted, to fetch data from the database. 
 * Shows a LoadingBar while data is not ready.
 */
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
/*
 * When a User votes for any option of a question, its choice will be saved to the database through the API.
 * Then, this vote will be added to the store's list of answers for this specific question,
 * and to the store's list of answers of the specific logged in User.
 */
export function handleVote (info) {
  return (dispatch) => {
    return saveQuestionAnswer(info)
      .then((data) => {
        dispatch(updateQuestionVote(info))
        dispatch(updateUserVote(info))
    })
  }
}

/* 
 * When a User adds a question, it will be saved to the database through the API.
 * Then, it will be added to the store's list of questions, and to the store's list of questions for
 * the specific logged in User 
 */
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