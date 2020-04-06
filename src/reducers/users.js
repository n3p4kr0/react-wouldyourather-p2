import { RECEIVE_USERS, UPDATE_USER_VOTE } from '../actions/users';

export default function users (state = {}, action) {
    switch(action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case UPDATE_USER_VOTE:
            const user = state[action.authedUser];
            user.answers[action.qid] = action.answer;
    
            return {
                ...state,
                users: {
                    ...state,
                    [action.authedUser]: user
                }
            }
        default:
            return state
    }
}
