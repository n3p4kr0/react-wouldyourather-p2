

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const REMOVE_QUESTION = 'REMOVE_QUESTION'
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'

export function receiveQuestions(questions) {
    return {
        action: RECEIVE_QUESTIONS,
        questions
    }
} 

export function addQuestion(question) {
    return {
        action: ADD_QUESTION,
        question
    }
}

export function removeQuestion(id) {
    return {
        action: REMOVE_QUESTION,
        id
    }
}

function saveQuestionAnswer(id) {
    return {
        action: SAVE_QUESTION_ANSWER,
        id
    }
}