export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const UPDATE_QUESTION_VOTE = 'UPDATE_QUESTION_VOTE'

// Called when the data is fetched from the API, when App is mounted
export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
} 

// Called when the User creates a new question, to add it to the store's list of questions
export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

// Called when the logged in User votes for any option of a Question
export function updateQuestionVote({ qid, authedUser, answer}) {
    return {
        type: UPDATE_QUESTION_VOTE,
        qid,
        authedUser,
        answer
    }
}