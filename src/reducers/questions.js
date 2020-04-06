import { RECEIVE_QUESTIONS, ADD_QUESTION, UPDATE_QUESTION_VOTE } from '../actions/questions';

export default function questions (state = {}, action) {
    switch(action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ADD_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question
            };
        case UPDATE_QUESTION_VOTE:
            const question = state[action.qid]
            question[action.answer].votes.push(action.authedUser);

            return {
                ...state,
                [action.qid]: question
            }
        default:
            return state
    }
}
