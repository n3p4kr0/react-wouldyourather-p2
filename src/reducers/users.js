import { RECEIVE_USERS, UPDATE_USER_VOTE, ADD_QUESTION_USER } from '../actions/users';

export default function users (state = {}, action) {
    switch(action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case UPDATE_USER_VOTE:
            //let user = state[action.authedUser];
            //user.answers[action.qid] = action.answer;
            console.log(state)
            console.log(action.authedUser)
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
            console.log(action)
            console.log(state)
            let userData = state[action.authedUser];
            console.log(userData)
            userData.questions.push(action.qid)

            return {
                ...state,
                [action.authedUser]: userData
            }
        default:
            return state
    }
}
