import { saveQuestion } from '../utils/api'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const REMOVE_QUESTION = 'REMOVE_QUESTION'
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'
export const UPDATE_QUESTION_VOTE = 'UPDATE_QUESTION_VOTE'

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
} 

export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function updateQuestionVote({ qid, authedUser, answer}) {
    return {
        type: UPDATE_QUESTION_VOTE,
        qid,
        authedUser,
        answer
    }
}