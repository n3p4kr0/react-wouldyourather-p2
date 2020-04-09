import {
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer,
    _saveUser
  } from './_DATA.js'
  
  export function getInitialData () {
    return Promise.all([
      _getUsers(),
      _getQuestions(),
    ]).then(([users, questions]) => ({
      users,
      questions,
    }))
  }
  
  export function saveQuestionAnswer (info) {
    return _saveQuestionAnswer(info)
  }


  export function saveQuestion(question) {
    return _saveQuestion(question)
  }
  
  export function saveUser (userData) {
    return _saveUser(userData)
  }
  