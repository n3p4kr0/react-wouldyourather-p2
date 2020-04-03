import { saveQuestion, saveQuestionAnswer } from '../utils/api'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const REMOVE_QUESTION = 'REMOVE_QUESTION'
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
} 

export function addQuestion(question) {
    return {
        type: REMOVE_QUESTION,
        question,
    }
}

export function handleAddQuestion({ optionOneText, optionTwoText }) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        console.log(getState());

        const test = {
            optionOneText,
            optionTwoText,
            author: authedUser
        }
        
        return saveQuestion(test)
          .then((question) => dispatch(addQuestion(question)));
    }
}

/*export function removeQuestion(id) {
    return {
        type: REMOVE_QUESTION,
        id
    }
}

function saveQuestionAnswer(id) {
    return {
        type: SAVE_QUESTION_ANSWER,
        id
    }
}*/