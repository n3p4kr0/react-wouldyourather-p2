export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const GET_AUTHED_USER = 'GET_AUTHED_USER'
export const LOGOUT = 'LOGOUT'
export const LOGIN = 'LOGIN'

export function setAuthedUser (action) {
  return {
    type: SET_AUTHED_USER,
    id: action.id
  }
}

export function isUserAuthed () {
  return {
    type: GET_AUTHED_USER
  }
}

export function logout() {
    return {
        type: LOGOUT
    }
}

export function login(id) {
  return {
      type: LOGIN,
      id
  }
}
