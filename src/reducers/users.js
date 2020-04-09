import { RECEIVE_USERS, UPDATE_USER_VOTE, ADD_QUESTION_USER, ADD_USER } from '../actions/users';

export default function users (state = {}, action) {
    switch(action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case UPDATE_USER_VOTE:
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser].answers,
                        [action.qid]: action.answer
                    }
                }
            }
        case ADD_QUESTION_USER:
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    questions: [
                        ...state[action.authedUser].questions,
                        action.qid   
                    ]
                }
            }
        case ADD_USER:
            console.log(action)
            return {
                ...state,
                [action.id]: {
                    id: [action.id],
                    name: [action.name],
                    avatarURL: [action.avatarURL],
                    answers: {},
                    questions: []
                }
            }
        default:
            return state
    }
}
