import { SET_AUTHED_USER, LOGOUT, LOGIN } from '../actions/authedUser'

export default function authedUser (state = null, action) {
    switch(action.type) {
        case SET_AUTHED_USER:
            return action.id
        case LOGOUT:
            return null
        case LOGIN:
            return action.id
        default:
            return state
    }
}
