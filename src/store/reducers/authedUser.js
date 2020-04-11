import { SET_AUTHED_USER, GET_AUTHED_USER, LOGOUT, LOGIN } from '../actions/authedUser'

export default function authedUser (state = null, action) {
    switch(action.type) {
        case GET_AUTHED_USER:
            return state
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
