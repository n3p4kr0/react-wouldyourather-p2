import { RECEIVE_QUESTIONS, ADD_QUESTION, REMOVE_QUESTION, SAVE_QUESTION_ANSWER } from '../actions/questions';

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
                ...action
            };
        /*case REMOVE_QUESTION:
            return;*/
        /*case SAVE_QUESTION_ANSWER:
            return;*/
        default:
            return state
    }
}
